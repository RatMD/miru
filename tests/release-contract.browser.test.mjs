import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { test } from 'vitest';

function measureContrasts(selector) {
    function luminance(color) {
        const rgb = color
            .match(/[\d.]+/g)
            .slice(0, 3)
            .map(Number)
            .map((v) => v / 255)
            .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
        return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    }
    return [...document.querySelectorAll(selector)].map((el) => {
        const style = getComputedStyle(el);
        // Canvas converts supported CSS colors (including OKLCH) to sRGB.
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const convert = (color) => {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const rgb = ctx.getImageData(0, 0, 1, 1).data;
            return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        };
        const a = luminance(convert(style.color)),
            b = luminance(convert(style.backgroundColor));
        return {
            id: el.dataset.test,
            color: style.color,
            background: style.backgroundColor,
            classes: el.className,
            contrast: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
        };
    });
}

test(
    'release field, responsive and packaged theme contracts work in a browser',
    { timeout: 120000 },
    async () => {
        const root = fileURLToPath(new URL('..', import.meta.url));
        const server = await createServer({
            configFile: false,
            root,
            plugins: [vue()],
            server: { host: '127.0.0.1', port: 0 },
            appType: 'custom',
        });
        server.middlewares.use(async (request, response, next) => {
            if (request.url !== '/contracts') return next();
            response.setHeader('Content-Type', 'text/html');
            response.end(
                await server.transformIndexHtml(
                    '/contracts',
                    `<!doctype html><html lang="en"><head><title>Miru contracts</title><link rel="stylesheet" href="/dist/style.css"></head><body><div id="app"></div><script type="module">
import {createApp,h,ref} from 'vue';
import {Button} from '/src/components/button/index.ts';
import {Badge} from '/src/components/badge/index.ts';
import {Tabs} from '/src/components/tabs/index.ts';
import {InputDateTime} from '/src/components/input-date-time/index.ts';
import {InputPhone} from '/src/components/input-phone/index.ts';
import {AutoComplete} from '/src/components/auto-complete/index.ts';
import {Checkbox} from '/src/components/checkbox/index.ts';
import {useBreakpoint} from '/src/composables/useBreakpoint.ts';
import {useForm} from '/src/composables/useForm.ts';
import FormFieldRenderer from '/src/components/form/FormFieldRenderer.vue';
import {z} from 'zod';
const roles=['primary','secondary','accent','info','success','warning','danger'];
createApp({setup(){const bp=useBreakpoint({min:'md'}); const checked=ref(true); const {form}=useForm({schema:z.object({generatedDate:z.string().nullable()}),initialValues:{generatedDate:null},submit:'/unused'}); window.contractForm=form; return()=>h('main',[
h('output',{id:'breakpoint'},String(bp.matches.value)),
h(Tabs,{tabs:[{value:'first',label:'First'},{value:'second',label:'Second'}],collapsible:false},{first:()=>h('p','First content'),second:()=>h('p','Second content')}),
h('form',{id:'native'},[h(FormFieldRenderer,{form,definition:{type:'date',name:'generatedDate',label:{value:'Generated date'},description:{value:'Pick a date'},class:'generated-date',wrapperClass:'generated-wrapper'}}),
h('label',{for:'birthday'},'Birthday'),h(InputDateTime,{id:'birthday',mode:'date',name:'birthday',modelValue:'2026-11-25',required:true,size:'lg',class:'date-field',wrapperClass:'date-wrapper'}),
h(InputPhone,{countries:[{value:'AT',label:'Austria',callingCode:'+43'}],countryCodeLabel:'Country',placeholder:'Number',name:'phone',modelValue:'+436641234567',readonly:true,class:'phone-field',wrapperClass:'phone-wrapper'}),
h(Checkbox,{name:'approved',modelValue:checked.value,readonly:true,'onUpdate:modelValue':v=>checked.value=v,label:'Approved'}),
h(AutoComplete,{id:'city',name:'city',options:[],class:'city-field',wrapperClass:'city-wrapper','aria-describedby':'city-help','aria-label':'City'}),
h('p',{id:'city-help'},'Choose a city')]),
...roles.flatMap(role=>[h(Button,{variant:role,'data-test':'button-'+role},()=>role),h(Badge,{variant:role,appearance:'solid','data-test':'badge-'+role},()=>role)])
]);}}).mount('#app');window.contractReady=true;
</script></body></html>`,
                ),
            );
        });
        let browser;
        try {
            await server.listen();
            browser = await chromium.launch({ headless: true });
            const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
            const errors = [];
            page.on('pageerror', (error) => errors.push(error.message));
            await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/contracts`);
            await page.waitForFunction(() => window.contractReady);
            assert.deepEqual(errors, []);
            await page.addStyleTag({
                content:
                    '*,*::before,*::after { transition: none !important; animation: none !important; }',
            });
            await page.getByRole('tab', { name: 'Second', exact: true }).click();
            assert.equal(
                await page
                    .getByRole('tab', { name: 'Second', exact: true })
                    .getAttribute('aria-selected'),
                'true',
            );
            await page.getByRole('checkbox', { name: 'Approved' }).click();
            assert.equal(
                await page.getByRole('checkbox', { name: 'Approved' }).getAttribute('aria-checked'),
                'true',
            );
            await page.addScriptTag({
                path: fileURLToPath(
                    new URL('../node_modules/axe-core/axe.min.js', import.meta.url),
                ),
            });
            const accessibility = await page.evaluate(async () =>
                (
                    await window.axe.run(document.querySelector('main'), {
                        runOnly: {
                            type: 'rule',
                            values: [
                                'label',
                                'aria-valid-attr-value',
                                'aria-allowed-attr',
                                'aria-input-field-name',
                            ],
                        },
                    })
                ).violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.html) })),
            );
            assert.deepEqual(accessibility, []);
            const data = await page.evaluate(() =>
                Object.fromEntries(new FormData(document.querySelector('#native'))),
            );
            assert.equal(data.birthday, '2026-11-25');
            assert.equal(data.phone, '+436641234567');
            assert.equal(data.approved, 'on');
            assert.equal(
                await page.locator('input#city').getAttribute('aria-describedby'),
                'city-help',
            );
            assert.ok(
                await page
                    .locator('input#city')
                    .evaluate((el) => el.classList.contains('city-field')),
            );
            assert.equal(await page.locator('.city-wrapper input#city').count(), 1);
            assert.equal(await page.locator('.date-wrapper button.date-field').count(), 1);
            const generated = page.locator('button#generatedDate');
            assert.equal(
                await page.locator('label[for=generatedDate]').textContent(),
                'Generated date',
            );
            assert.equal(
                await generated.getAttribute('aria-describedby'),
                'generatedDate-description',
            );
            await generated.focus();
            await page.locator('input#city').focus();
            await page.waitForFunction(
                () => window.contractForm.getFieldMeta('generatedDate')?.isTouched === true,
            );
            assert.equal(await page.locator('.generated-wrapper button.generated-date').count(), 1);
            await page.evaluate(() =>
                document.documentElement.style.setProperty('--ui-breakpoint-md', '1100px'),
            );
            await page.waitForFunction(
                () => document.querySelector('#breakpoint').textContent === 'false',
            );
            await page.evaluate(() =>
                document.documentElement.style.setProperty('--ui-breakpoint-md', '900px'),
            );
            await page.waitForFunction(
                () => document.querySelector('#breakpoint').textContent === 'true',
            );

            for (const scheme of [
                'modern',
                'northern-lights',
                'lagoon',
                'rosewood',
                'golden-hour',
                'original',
            ]) {
                const css = await readFile(
                    new URL(`../dist/themes/${scheme}.css`, import.meta.url),
                    'utf8',
                );
                // Keep earlier sheets to verify that switching back to Original resets every token.
                await page.addStyleTag({ content: css });
                for (const dark of [false, true]) {
                    await page.evaluate(
                        (dark) => document.documentElement.classList.toggle('dark', dark),
                        dark,
                    );
                    const contrasts = await page.evaluate(measureContrasts, '[data-test]');
                    for (const id of await page
                        .locator('[data-test]')
                        .evaluateAll((els) => els.map((el) => el.dataset.test))) {
                        const target = page.locator(`[data-test=${id}]`);
                        await target.hover();
                        for (const state of ['hover', 'active']) {
                            if (state === 'active') await page.mouse.down();
                            const [result] = await page.evaluate(
                                measureContrasts,
                                `[data-test=${id}]`,
                            );
                            assert.ok(
                                result.contrast >= 4.5,
                                `${scheme} dark=${dark} ${state} ${JSON.stringify(result)}`,
                            );
                            if (state === 'active') await page.mouse.up();
                        }
                    }
                    for (const result of contrasts)
                        assert.ok(
                            result.contrast >= 4.5,
                            `${scheme} dark=${dark} ${JSON.stringify(result)}`,
                        );
                }
            }
            await page.addStyleTag({ content: ':root { --ui-primary-border: rgb(1, 2, 3); }' });
            assert.equal(
                await page
                    .locator('[data-test=button-primary]')
                    .evaluate((el) => getComputedStyle(el).borderTopColor),
                'rgb(1, 2, 3)',
            );
        } finally {
            await browser?.close();
            await server.close();
        }
    },
);
