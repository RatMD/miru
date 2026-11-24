import type { StoryObj } from '@storybook/vue3-vite';
import type { AnyFormApi } from '@tanstack/vue-form';
import { ref } from 'vue';
import { z } from 'zod';
import { defineFormSections, literal } from '../components/form';
import { useForm } from '../composables';
import { storyComponents as components } from './ui-components';

/** This live documentation validates locally; real transport is covered in the guide. */
export function systemStory(template: string): StoryObj['render'] {
    return (args) => ({
        components,
        setup() {
            const schema = z.object({
                name: z.string().min(2, 'Enter at least two characters.'),
                email: z.email('Enter a valid email address.'),
            });
            const controller = useForm({
                schema,
                initialValues: { name: '', email: '' },
                submit: '/storybook-example',
                mode: 'json',
            });
            const sections = defineFormSections<'name' | 'email'>([
                {
                    id: 'profile',
                    label: literal('Profile'),
                    title: literal('Profile details'),
                    fields: [
                        {
                            type: 'input',
                            name: 'name',
                            label: literal('Name'),
                            required: true,
                            span: 6,
                        },
                        {
                            type: 'input',
                            inputType: 'email',
                            name: 'email',
                            label: literal('Email'),
                            required: true,
                            span: 6,
                        },
                    ],
                },
            ]);
            const feedback = ref('');
            async function validateOnly(): Promise<void> {
                const form = controller.form as unknown as AnyFormApi;
                await form.validate('submit');
                for (const name of ['name', 'email'])
                    form.setFieldMeta(name, (current) => ({ ...current, isTouched: true }));
                feedback.value = form.state.isValid
                    ? 'Valid — the documentation does not send a request.'
                    : 'Check the highlighted fields.';
            }
            return {
                args,
                controller,
                sections,
                validateOnly,
                feedback,
                text: ref(''),
                amount: ref(''),
                notes: ref(''),
            };
        },
        template,
    });
}
