<template>
    <ContextProvider :locale="locale">
        <div class="max-w-xl space-y-3">
            <Button variant="outline" size="sm" @click="fail = !fail">
                {{ fail ? 'Processing error enabled' : 'JPEG · 1920px · 90%' }}
            </Button>
            <UploadZone
                title="Images"
                gallery
                :transform-files="prepare"
                @files="
                    (files) =>
                        (message = files.map((file) => file.name + ' · ' + file.type).join(', '))
                "
                @processing-error="message = 'Processing failed'" />
            <output aria-live="polite">{{ message }}</output>
        </div>
    </ContextProvider>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '../components/button';
import { ContextProvider } from '../components/provider';
import { UploadZone } from '../components/upload-zone';
import { resize } from '../support/resize';
defineProps<{ locale: string }>();
const fail = ref(false),
    message = ref('');
async function prepare(files: File[]): Promise<File[]> {
    if (fail.value) throw new Error('Demo processing failure');
    return Promise.all(
        files.map(async (file) => {
            const input = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result));
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(file);
            });
            const result = await resize(input, 1920, 1920, { type: 'image/jpeg', quality: 0.9 });
            const blob = await (await fetch(result)).blob();
            return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', {
                type: 'image/jpeg',
                lastModified: file.lastModified,
            });
        }),
    );
}
</script>
