import { mount } from '@vue/test-utils';
import { expect, suite, test } from 'vitest';

import { useForm } from '../src/composables/use-form';

suite('Form Composable', () => {
    const formElement = {
        template: '<form method="post" action="test"></form>',
        props: []
    };

    interface TestForm {
        string: string;
        number: number;
        boolean: boolean;
    }

    /**
     * Initialize Form Composable
     */
    test('Initialize', () => {
        const wrapper = mount(formElement, {
            props: {}
        });

        const form = useForm(wrapper.element, { });
        expect(form.form.value?.outerHTML).toBe(formElement.template);
        expect(form.action.value).toBe('test');
        expect(form.method.value).toBe('POST');
        expect(form.dirty.value).toBe(false);
        expect(form.touched.value).toBe(false);
    });

    /**
     * Set Values
     */
    test('Values', () => {
        const wrapper = mount(formElement, {
            props: {}
        });

        const form = useForm<TestForm>(wrapper.element, {
            string: null,
            number: null,
            boolean: null
        });
        expect(form.values).toMatchObject({
            string: null,
            number: null,
            boolean: null
        });
        
        form.values.string = 'test';
        form.values.number = 12
        form.values.boolean = false;
        expect(form.values).toMatchObject({
            string: 'test',
            number: 12,
            boolean: false
        });
        expect(form.dirtyKeys.value).toMatchObject(['string', 'number', 'boolean']);
        expect(form.dirty.value).toBe(true);
        expect(form.touched.value).toBe(false);
    });

});
