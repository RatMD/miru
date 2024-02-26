import type { Meta, StoryObj } from '@storybook/vue3';

import AccordionStd from './AccordionStd.vue';
import AccordionTab from './AccordionTab.vue';

/**
 * The **AccordionStd** component provides the possibility of displaying several **AccordionTab**
 * components on one place, providing an improved styling as well as additional behaviors and the 
 * possibility to share common options among all tabs passed on one single place. However, the 
 * **AccordionTab** component can still be used separately and outside of **AccordionStd**.
 * 
 * Internally, the **AccordionTab** component relies on **CollapseSupport** to integrate the 
 * expanding / collapsing behavior.
 */
const meta = {
    title: 'Components/Accordions/Accordion',
    component: AccordionStd,
    tags: ['autodocs'],
    argTypes: {
        id: {
            control: 'text'
        },
        multiple: {
            control: 'boolean'
        },
        pass: { 
            control: 'object'
        },
    },
    args: {

    },
    render: (args: any) => ({
        components: { AccordionStd, AccordionTab },
        setup() {
            return { args };
        },
        template: `
            <AccordionStd v-bind="args">
                <AccordionTab label="Accordion Tab 1">
                    Content
                </AccordionTab>
                <AccordionTab label="Accordion Tab 2">
                    Content
                </AccordionTab>
                <AccordionTab label="Accordion Tab 3">
                    Content
                </AccordionTab>
            </AccordionStd>
        `
    })
} satisfies Meta<typeof AccordionStd>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * The default variant of the **AccordionStd** component takes over the ID and visibility state 
 * handling by disallowing multiple **AccordionTab** components to be open at the same time.
 */
export const Default: Story = {
    args: {
        
    }
};

/**
 * Using the `multiple` property allows multiple **AccordionTab** components to be open at the same 
 * time.
 */
export const Multiple: Story = {
    args: {
        multiple: true
    }
};

/**
 * With the `pass` property you're able to pass shared / common options between the individual 
 * **AccordionTab** components on one single place. However, this does not work with `id`, `label` 
 * and the `visible` v-model state.
 */
export const Pass: Story = {
    args: {
        pass: {
            iconPlacement: 'left'
        }
    }
};
