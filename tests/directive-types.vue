<template>
    <div v-filesize:2.metric="1024" />
    <div v-file-size="'2048'" />
    <div v-price.cents="1234" />
    <div v-number-format="1234.5" />
    <span
        v-number-format="{
            value: '1234.50',
            locale: 'de-DE',
            options: { minimumFractionDigits: 2 },
        }" />
    <div v-dayjs="new Date()" />
    <div v-click-outside.once="onOutside" />
    <div v-resize.immediate="onResize" />
    <textarea v-tinymce="editor" />

    <!-- @vue-expect-error Filesize accepts numeric/string values, not objects. -->
    <div v-filesize="{ bytes: 1024 }" />
    <!-- @vue-expect-error The file-size alias must retain the same binding type. -->
    <div v-file-size="true" />
    <!-- @vue-expect-error Price does not accept booleans. -->
    <div v-price="true" />
    <!-- @vue-expect-error Number formatting does not accept booleans. -->
    <div v-number-format="true" />
    <!-- @vue-expect-error Intl notation is a fixed set of string values. -->
    <span v-number-format="{ value: 42, options: { notation: 'unknown' } }" />
    <!-- @vue-expect-error Dates do not accept arbitrary objects. -->
    <div v-dayjs="{}" />
    <!-- @vue-expect-error Click handlers receive a MouseEvent. -->
    <div v-click-outside="(event: string) => event" />
    <!-- @vue-expect-error Resize handlers receive size objects. -->
    <div v-resize="(size: number) => size" />
    <!-- @vue-expect-error TinyMCE requires a complete editor binding. -->
    <textarea v-tinymce="{ value: 'incomplete' }" />
</template>

<script setup lang="ts">
import type { TinymceBinding } from '@rat.md/miru/plugins/directives';
import { createMiruDirectives } from '@rat.md/miru/plugins/directives';

createMiruDirectives();

const onOutside = (event: MouseEvent): void => {};
const onResize = (element: { width: number; height: number }): void => {};
const editor: TinymceBinding = {
    value: '',
    label: 'Content',
    locale: 'de',
    disabled: false,
    update: (value: string): void => {},
};
</script>
