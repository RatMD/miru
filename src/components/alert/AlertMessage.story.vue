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

        <Variant title="Badges">
            <div>
                <AlertMessage type="note" variant="badge">
                    Note Message
                </AlertMessage>
            </div>
            <div>
                <AlertMessage type="info" variant="badge">
                    Info Message
                </AlertMessage>
            </div>
            <div>
                <AlertMessage type="success" variant="badge">
                    Success Message
                </AlertMessage>
            </div>
            <div>
                <AlertMessage type="warning" variant="badge">
                    Warning Message
                </AlertMessage>
            </div>
            <div>
                <AlertMessage type="danger" variant="badge">
                    Danger Message
                </AlertMessage>
            </div>
        </Variant>

        <Variant title="Custom Icon">
            <div>
                <AlertMessage type="info" variant="badge" :icon="icon">
                    <template #default>
                        Loading...
                    </template>
                </AlertMessage>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import AlertMessage from './AlertMessage.vue';

const icon = {
    functional: true,
    props: {
        size: Number
    },
    render(props: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: props?.size ?? 16,
            height: props?.size ?? 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            class: "lucide lucide-loader-circle animate-rotate",
        }, [
            h('path', { d: "M21 12a9 9 0 1 1-6.219-8.56" }),
        ]);
    }
};
</script>

<docs lang="md">
Work in Progress
</docs>
