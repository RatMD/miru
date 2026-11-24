<template>
    <div class="mx-auto w-full max-w-4xl space-y-3">
        <Carousel
            v-bind="args"
            v-model="selected"
            :items="args.empty ? [] : args.single ? slides.slice(0, 1) : slides"
            :get-key="(item) => item.id"
            :label="copy.label">
            <template #slide="{ item, index }">
                <Card v-if="args.autoHeight" class="overflow-hidden">
                    <CardHeader>
                        <CardTitle>{{ item.title }}</CardTitle>
                        <CardDescription>{{ copy.description }}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p
                            v-for="n in (index % 3) + 1"
                            :key="n"
                            class="mb-3 text-sm leading-6 text-muted-foreground">
                            {{ copy.paragraph }}
                        </p>
                    </CardContent>
                </Card>
                <article
                    v-else
                    class="relative overflow-hidden rounded-md bg-muted"
                    :class="args.orientation === 'vertical' ? 'h-full min-h-32' : 'h-64 sm:h-72'">
                    <img
                        :src="item.image"
                        :alt="item.title"
                        class="absolute inset-0 size-full object-cover"
                        draggable="false" />
                    <div
                        class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-6 pt-12 text-white">
                        <p class="text-xl font-semibold">{{ item.title }}</p>
                        <p class="mt-1 text-sm">{{ copy.slide }} {{ index + 1 }}</p>
                    </div>
                </article>
            </template>
        </Carousel>
        <output data-testid="carousel-selection" class="text-xs text-muted-foreground">
            {{ copy.selected }}: {{ selected + 1 }}
        </output>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/card';
import { Carousel } from '../components/carousel';
const props = defineProps<{ args: Record<string, any>; locale: string }>();
const copy = computed(() =>
    props.locale === 'de'
        ? {
              label: 'Landschaftsgalerie',
              description: 'Unterschiedlich hohe Inhalte',
              paragraph:
                  'Jede Folie kann eigene Inhalte enthalten. Die Höhe folgt bei aktivierter automatischer Höhenanpassung der ausgewählten Folie.',
              selected: 'Ausgewählte Seite',
              slide: 'Folie',
              titles: ['Berge', 'Wald', 'See', 'Küste', 'Wüste'],
          }
        : {
              label: 'Landscape gallery',
              description: 'Content with different heights',
              paragraph:
                  'Each slide can contain its own content. With automatic height enabled, the viewport follows the selected slide.',
              selected: 'Selected page',
              slide: 'Slide',
              titles: ['Mountains', 'Forest', 'Lake', 'Coast', 'Desert'],
          },
);
const selected = ref(0);
const colors = [
    ['#0369a1', '#0c4a6e'],
    ['#059669', '#064e3b'],
    ['#7c3aed', '#312e81'],
    ['#0891b2', '#164e63'],
    ['#d97706', '#78350f'],
];
const slides = computed(() =>
    copy.value.titles.map((title, index) => ({
        id: index,
        title,
        image:
            'data:image/svg+xml,' +
            encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="${colors[index]![0]}"/><stop offset="1" stop-color="${colors[index]![1]}"/></linearGradient></defs><path fill="url(#sky)" d="M0 0h1000v500H0z"/><circle cx="780" cy="100" r="55" fill="white" opacity=".3"/><path d="M0 420 220 150 450 370 670 190 1000 450v50H0z" fill="white" opacity=".18"/><path d="m0 470 370-190 260 170 230-120 140 140v30H0z" fill="black" opacity=".2"/></svg>`,
            ),
    })),
);
</script>
