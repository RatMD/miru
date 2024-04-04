<template>
    <Story title="Components/Button/ButtonGroup" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <ButtonGroup>
                <ButtonStd label="Secondary Action" color="secondary" />
                <ButtonStd label="Primary Action" color="primary" />
            </ButtonGroup>
        </Variant>
        
        <Variant title="Variable">
            <div class="flex flex-col gap-4">     
                <ButtonGroup>
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Another Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
                <ButtonGroup>
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
            </div>
        </Variant>

        <Variant title="Alignment">
            <div class="flex flex-col gap-4">        
                <ButtonGroup align="left">
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
                <ButtonGroup align="center">
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
                <ButtonGroup align="right">
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
            </div>
        </Variant>

        <Variant title="Sizes">
            <div class="flex flex-col gap-4">
                <ButtonGroup size="sm">
                    <ButtonStd label="Secondary Action" color="secondary" size="sm" />
                    <ButtonStd label="Primary Action" color="primary" size="sm" />
                </ButtonGroup>
                <ButtonGroup size="md">
                    <ButtonStd label="Secondary Action" color="secondary" size="md" />
                    <ButtonStd label="Primary Action" color="primary" size="md" />
                </ButtonGroup>
                <ButtonGroup size="lg">
                    <ButtonStd label="Secondary Action" color="secondary" size="lg" />
                    <ButtonStd label="Primary Action" color="primary" size="lg" />
                </ButtonGroup>
            </div>
        </Variant>

        <Variant title="Vertical">
            <div class="max-w-sm">
                <ButtonGroup vertical>
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Another Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" />
                </ButtonGroup>
            </div>
        </Variant>

        <Variant title="Manually">
            <ButtonGroup manually align="center">
                <ButtonStd label="Ungrouped Action" color="secondary" class="btn-ungrouped" />
                <ButtonStd label="Secondary Action" color="secondary" />
                <ButtonStd label="Another Action" color="secondary" />
                <ButtonStd label="Primary Action" color="primary" />
            </ButtonGroup>
            
            <div class="max-w-sm mx-auto mt-8">
                <ButtonGroup manually vertical>
                    <ButtonStd label="Ungrouped Action" color="secondary" />
                    <ButtonStd label="Secondary Action" color="secondary" />
                    <ButtonStd label="Another Action" color="secondary" />
                    <ButtonStd label="Primary Action" color="primary" class="btn-ungrouped" />
                </ButtonGroup>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import ButtonGroup from './ButtonGroup.vue';
import ButtonStd from '../button/ButtonStd.vue';
</script>

<docs lang="md">
The ButtonGroup component can be used to stylistically connect several related action buttons. 
At the moment, only the default __ButtonStd__ component is 
supported.
</docs>
