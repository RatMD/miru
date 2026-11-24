import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DirectiveDemo from './DirectiveDemo.vue';
const meta = {
    title: 'Plugins/Examples',
    tags: ['!dev', '!autodocs'],
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                component:
                    'Portable MIRU directives. Install MiruPlugin globally or import individual directives from @rat.md/miru/plugins. See Integration for all bindings and lifecycle behavior.',
            },
        },
    },
} satisfies Meta;
export default meta;
const render =
    (mode: 'dayjs' | 'filesize' | 'price' | 'click-outside' | 'resize'): StoryObj['render'] =>
    (_, { globals }) => ({
        components: { DirectiveDemo },
        setup: () => ({ mode, locale: globals.locale === 'de' ? 'de-DE' : 'en-US' }),
        template: '<DirectiveDemo :mode="mode" :locale="locale"/>',
    });
export const Dayjs: StoryObj = { render: render('dayjs') };
export const Filesize: StoryObj = { render: render('filesize') };
export const Price: StoryObj = { render: render('price') };
export const ClickOutside: StoryObj = { render: render('click-outside') };
export const Resize: StoryObj = { render: render('resize') };
