import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within } from 'storybook/test';
import { defineComponent, h } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { componentSummary } from '../../stories/component-documentation';
import { Button } from '../button';
import { ContextProvider } from './index';

const LocalePreview = defineComponent({
    setup() {
        const { locale, trans } = useI18n();
        return () =>
            h('div', { class: 'grid justify-items-start gap-3' }, [
                h('p', `Active locale: ${locale.value}`),
                h(Button, {}, () => trans('common.actions.save')),
            ]);
    },
});
const meta = {
    title: 'Utilities/ContextProvider',
    component: ContextProvider,
    args: { locale: 'en' },
    argTypes: {
        locale: { control: 'select', options: ['en', 'de'] },
        translate: { control: false },
        translateChoice: { control: false },
    },
    parameters: { docs: { description: { component: componentSummary('ContextProvider') } } },
    render: (args) => ({
        components: { ContextProvider, LocalePreview },
        setup: () => ({ args }),
        template: '<ContextProvider v-bind="args"><LocalePreview /></ContextProvider>',
    }),
} satisfies Meta<typeof ContextProvider>;
export default meta;
export const Default: StoryObj<typeof meta> = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Active locale: en')).toBeVisible();
        await expect(canvas.getByRole('button', { name: 'Save' })).toBeVisible();
    },
};
export const German: StoryObj<typeof meta> = { args: { locale: 'de' } };
