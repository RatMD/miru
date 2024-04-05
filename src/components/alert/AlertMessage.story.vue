<template>
    <Story title="Components/Alert/AlertMessage" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <AlertMessage>A simple alert message.</AlertMessage>
        </Variant>

        <Variant title="Types">
            <AlertMessage type="note">Note Message</AlertMessage>
            <AlertMessage type="info">Info Message</AlertMessage>
            <AlertMessage type="success">Success Message</AlertMessage>
            <AlertMessage type="warning">Warning Message</AlertMessage>
            <AlertMessage type="danger">Danger Message</AlertMessage>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import AlertMessage from './AlertMessage.vue';
</script>

<docs lang="md">
Work in Progress
</docs>
