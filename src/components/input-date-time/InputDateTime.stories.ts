import type { InputDateTimeMode, InputDateTimeValue } from './types';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { computed, ref } from 'vue';
import { componentDescription } from '../../stories/component-descriptions';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { InputDateTime } from './index';

const meta: Meta = {
    title: 'FormFields/InputDateTime',
    parameters: {
        docs: {
            page: FormFieldDocs,
            description: { component: componentDescription('InputDateTime') },
        },
    },
    component: InputDateTime,
    args: { mode: 'datetime', size: 'default', disabled: false },
    argTypes: {
        mode: { control: 'select', options: ['datetime', 'date', 'time', 'timeframe'] },
        size: { control: 'select', options: ['sm', 'default'] },
        disabled: { control: 'boolean' },
    },
    render: (args, { globals }) => ({
        components: { InputDateTime },
        setup() {
            const values = ref<Record<InputDateTimeMode, InputDateTimeValue>>({
                datetime: '2026-11-17T12:30',
                date: '2026-11-17',
                time: '12:30',
                timeframe: { start: '09:00', end: '17:00' },
            });
            const value = computed({
                get: () => values.value[args.mode as InputDateTimeMode],
                set: (value) => {
                    values.value[args.mode as InputDateTimeMode] = value;
                },
            });
            return { args, value, locale: globals.locale || 'en' };
        },
        template:
            '<div class="grid w-80 max-w-full gap-4"><InputDateTime v-bind="args" v-model="value" :locale="locale" /><output data-testid="value">{{ value }}</output></div>',
    }),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeFormFieldControls('InputDateTime', meta.argTypes);
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Date: StoryObj = { args: { mode: 'date' } };
export const Time: StoryObj = { args: { mode: 'time' } };
export const Timeframe: StoryObj = { args: { mode: 'timeframe' } };
export const TimeframeInteraction: StoryObj = {
    args: { mode: 'timeframe' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const body = within(canvasElement.ownerDocument.body);
        await userEvent.click(canvas.getByRole('button', { name: /^From$|^Von$/ }));
        await userEvent.click(
            within(body.getByRole('listbox', { name: /^Hours$|^Stunden$/ })).getByRole('option', {
                name: '10',
            }),
        );
        await userEvent.keyboard('{Escape}');
        await waitFor(() => expect(body.queryAllByRole('listbox')).toHaveLength(0));
        await expect(canvas.getByTestId('value')).toHaveTextContent('10:00');
        await expect(canvas.getByTestId('value')).toHaveTextContent('17:00');
        await userEvent.click(canvas.getByRole('button', { name: /^Until$|^Bis$/ }));
        await userEvent.click(
            within(body.getByRole('listbox', { name: /^Minutes$|^Minuten$/ })).getByRole('option', {
                name: '30',
            }),
        );
        await userEvent.keyboard('{Escape}');
        await waitFor(() => expect(body.queryAllByRole('listbox')).toHaveLength(0));
        await expect(canvas.getByTestId('value')).toHaveTextContent('17:30');
    },
};
