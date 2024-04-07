<template>
    <Story title="Components/Alert/AlertStd" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <AlertStd>A simple alert message.</AlertStd>
        </Variant>

        <Variant title="Types">
            <AlertStd type="note">Note Message</AlertStd>
            <AlertStd type="info">Info Message</AlertStd>
            <AlertStd type="success">Success Message</AlertStd>
            <AlertStd type="warning">Warning Message</AlertStd>
            <AlertStd type="danger">Danger Message</AlertStd>
        </Variant>

        <Variant title="Title">
            <AlertStd type="note" title="Note Title">A Note message with an <a href="#">additional link</a>.</AlertStd>
            <AlertStd type="info" title="Info Title">A Info message with an <a href="#">additional link</a>.</AlertStd>
            <AlertStd type="success" title="Success Title">A Success message with an <a href="#">additional link</a>.</AlertStd>
            <AlertStd type="warning" title="Warning Title">A Warning message with an <a href="#">additional link</a>.</AlertStd>
            <AlertStd type="danger" title="Danger Title">A Danger message with an <a href="#">additional link</a>.</AlertStd>
        </Variant>

        <Variant title="Closable">
            <AlertStd type="note" closable>Note Message</AlertStd>
            <AlertStd type="info" closable>Info Message</AlertStd>
            <AlertStd type="success" closable>Success Message</AlertStd>
            <AlertStd type="warning" closable>Warning Message</AlertStd>
            <AlertStd type="danger" closable>Danger Message</AlertStd>
        </Variant>

        <Variant title="Bordered">
            <AlertStd type="note" title="Note Title" bordered>
                A Note message with an <a href="#">additional link</a>.
            </AlertStd>
            <AlertStd type="info" title="Info Title" bordered>
                A Info message with an <a href="#">additional link</a>.
            </AlertStd>
            <AlertStd type="success" title="Success Title" bordered>
                A Success message with an <a href="#">additional link</a>.
            </AlertStd>
            <AlertStd type="warning" title="Warning Title" bordered>
                A Warning message with an <a href="#">additional link</a>.
            </AlertStd>
            <AlertStd type="danger" title="Danger Title" bordered>
                A Danger message with an <a href="#">additional link</a>.
            </AlertStd>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import AlertStd from './AlertStd.vue';
</script>

<docs lang="md">
Work in Progress
</docs>
