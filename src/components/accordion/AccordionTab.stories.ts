import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import AccordionTab from './AccordionTab.vue';

/**
 * The **AccordionTab** component is a vertically collapsing element and is perfect for presenting 
 * longer content in a structured way without overwhelming the user with a flood of data. This 
 * component can be used individually, when using multiple instances of this component it's 
 * recommended using the **AccordionStd** component as parent.
 * 
 * Internally, the **AccordionTab** component relies on **CollapseSupport** to integrate the 
 * expanding / collapsing behavior.
 */
const meta = {
    title: 'Components/Accordions/AccordionTab',
    component: AccordionTab,
    tags: ['autodocs'],
    argTypes: {
        id: {
            control: 'text'
        },
        label: {
            control: 'text'
        },
        icon: { 
            control: 'object'
        },
        iconProps: { 
            control: 'object' 
        },
        iconPlacement: { 
            control: 'radio', 
            options: ['left', 'right'] 
        },
        duration: {
            control: 'text'
        },
        visible: {
            control: 'boolean'
        },
    },
    args: {
        label: 'Accordion Label',
        iconPlacement: 'right'
    },
    render: (args: any) => ({
        components: { AccordionTab },
        setup() {
            const visible = ref<boolean>(args.visible || false);
            return { args, visible };
        },
        template: `
            <AccordionTab v-bind="args" v-model:visible="visible">
                {{ args.default }}
            </AccordionTab>
        `
    })
} satisfies Meta<typeof AccordionTab>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * The default variant of the **AccordionTab** component provides a rotating chevron on the right 
 * side and takes over the ID handling. Thus, in fact, you only have to pass the accordion content 
 * and label.
 */
export const Default: Story = {
    args: {
        default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
};

/**
 * Using `right` as `iconPlacement` property value will change the icon position as shown below. 
 * Note, that we change the HTML position of the desired icon instead of switching the flex `order`
 * CSS-property value.
 */
export const LeftIcon: Story = {
    args: {
        default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        iconPlacement: 'left'
    },
};

/**
 * The condensed styling reduces spacing, font sizes and sometimes also simplifies some design 
 * elements, depending on the component.
 */
export const Condensed: Story = {
    args: {
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        condensed: true
    }
};
