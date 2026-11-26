<template>
    <form class="grid max-w-md gap-3" @submit.prevent="submitForm">
        <form.Field name="name">
            <template #default="{ field }">
                <label for="adapter-name" class="text-sm font-medium">Name</label>
                <Input
                    id="adapter-name"
                    :model-value="field.state.value"
                    @update:model-value="field.handleChange(String($event))" />
                <p v-if="field.state.meta.errors.length" role="alert" class="text-sm text-danger">
                    {{ field.state.meta.errors.join(' ') }}
                </p>
            </template>
        </form.Field>
        <p v-if="formError" role="alert" class="text-sm text-danger">{{ formError }}</p>
        <Button type="submit" :loading="loading">Save</Button>
        <output v-if="saved" role="status">Saved {{ saved }}</output>
        <p class="text-sm text-muted-foreground">
            Local adapter preview. No request is sent. “Rejected” demonstrates a server validation
            error.
        </p>
    </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { useForm } from '../composables/useForm';

const saved = ref('');
const { form, formError, loading, submitForm } = useForm({
    schema: z.object({ name: z.string().trim().min(1, 'Enter a name.') }),
    initialValues: { name: '' },
    submit: '/preview/profile',
    onSuccess: ({ values }) => {
        saved.value = values.name;
    },
});
</script>
