<template>
    <AuthPage v-bind="forwarded" :title="copy.title" :description="copy.description">
        <template #brand>
            <div class="flex items-center gap-3 text-lg font-semibold">
                <IconHexagon class="size-8 text-primary-600 dark:text-primary-300" />
                MIRU
                <span class="ms-auto text-xs font-normal text-muted-foreground">WORKSPACE</span>
            </div>
        </template>
        <form class="grid gap-5" @submit.prevent="submitted = true">
            <Alert v-if="submitted" variant="success" appearance="soft">
                <AlertDescription>{{ copy.success }}</AlertDescription>
            </Alert>
            <div class="grid gap-2">
                <Label :for="`${id}-email`">{{ copy.email }}</Label>
                <Input
                    :id="`${id}-email`"
                    v-model="email"
                    type="email"
                    autocomplete="username"
                    placeholder="you@example.test"
                    required />
            </div>
            <div class="grid gap-2">
                <div class="flex items-center justify-between gap-3">
                    <Label :for="`${id}-password`">{{ copy.password }}</Label>
                    <a
                        href="#recovery"
                        class="text-xs text-primary-700 dark:text-primary-300"
                        @click.prevent>
                        {{ copy.forgot }}
                    </a>
                </div>
                <InputPassword
                    :id="`${id}-password`"
                    v-model="password"
                    autocomplete="current-password"
                    required />
            </div>
            <Button type="submit" variant="primary" class="w-full">{{ copy.submit }}</Button>
            <p class="text-center text-xs leading-5 text-muted-foreground">{{ copy.notice }}</p>
        </form>
        <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-2">
                <span>© MIRU</span>
                <a href="#help" class="hover:text-foreground" @click.prevent>{{ copy.help }}</a>
            </div>
        </template>
        <template v-if="variant !== 'card'" #visual-overlay>
            <p class="mb-3 text-xs font-medium tracking-[.2em] uppercase opacity-80">
                YOUR SPACE. YOUR FLOW.
            </p>
            <h2 class="max-w-lg text-3xl leading-tight font-medium lg:text-4xl">
                {{ copy.headline }}
            </h2>
            <p class="mt-4 max-w-md text-sm leading-6 text-white/75">{{ copy.visual }}</p>
        </template>
    </AuthPage>
</template>

<script setup lang="ts">
import { IconHexagon } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { computed, ref, useId } from 'vue';
import { Alert, AlertDescription } from '../components/alert';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { InputPassword } from '../components/input-password';
import { Label } from '../components/label';
import { AuthPage } from '../layouts';

const props = withDefaults(
    defineProps<{
        locale?: string;
        variant?: 'split' | 'card';
        panelSide?: 'left' | 'right';
        fullHeight?: boolean;
        framed?: boolean;
        hideVisualOnMobile?: boolean;
        image?: string;
        panelWidth?: number | string;
        height?: number | string;
    }>(),
    { locale: 'en' },
);
const forwarded = reactiveOmit(props, 'locale');
const id = useId();
const email = ref('');
const password = ref('');
const submitted = ref(false);
const copy = computed(() =>
    props.locale === 'de'
        ? {
              title: 'Willkommen zurück.',
              description: 'Melde dich an, um deinen Arbeitsbereich zu öffnen.',
              email: 'E-Mail',
              password: 'Passwort',
              forgot: 'Passwort vergessen?',
              submit: 'Anmelden',
              notice: 'Vorschau: Dieses Formular sendet keine Anmeldedaten.',
              success: 'Die Demo wurde erfolgreich ausgefüllt.',
              help: 'Hilfe & Datenschutz',
              headline: 'Raum für das, was du vorhast.',
              visual: 'Ein gemeinsamer Einstieg für deine Anwendungen – mit deinem Bild, deiner Sprache und deinen Farben.',
          }
        : {
              title: 'Welcome back.',
              description: 'Sign in to continue to your workspace.',
              email: 'Email',
              password: 'Password',
              forgot: 'Forgot password?',
              submit: 'Sign in',
              notice: 'Preview: this form does not send credentials.',
              success: 'The demo form was completed successfully.',
              help: 'Help & privacy',
              headline: 'A little more room for what comes next.',
              visual: 'One familiar entry point for your applications, with your imagery, language and palette.',
          },
);
</script>
