<template>
    <Story title="Components/Accordion/AccordionTab">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <AccordionTab label="Accordion Item" v-bind="state" v-model:visible="state.visible">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                officia deserunt mollit anim id est laborum.
            </AccordionTab>
        </Variant>

        <Variant title="Left Icon" :init-state="stateLeftIcon" v-slot="{ state }">
            <AccordionTab label="Accordion Item" v-bind="state" v-model:visible="state.visible">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                officia deserunt mollit anim id est laborum.
            </AccordionTab>
        </Variant>

        <Variant title="Condensed" :init-state="stateCondensed" v-slot="{ state }">
            <AccordionTab label="Accordion Item" v-bind="state" v-model:visible="state.visible">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                officia deserunt mollit anim id est laborum.
            </AccordionTab>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AccordionTab from './AccordionTab.vue';

function stateDefault() {
    return {
        visible: ref<boolean>(false)
    }
}

function stateLeftIcon() {
    return {
        visible: ref<boolean>(false),
        iconPlacement: 'left'
    }
}

function stateCondensed() {
    return {
        visible: ref<boolean>(false),
        condensed: true
    }
}
</script>

<docs lang="md">
The **AccordionTab** component is a vertically collapsing element and is perfect for presenting 
longer content in a structured way without overwhelming the user with a flood of data. This 
component can be used individually, when using multiple instances of this component it's 
recommended using the **AccordionGroup** component as parent.

Internally, the **AccordionTab** component relies on **CollapseSupport** to integrate the 
expanding / collapsing behavior.
</docs>
