import './styles/styles.css';

import type { Theme } from 'vitepress';

import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import MiruSource from './components/MiruSource.vue';

// https://vitepress.dev/guide/custom-theme
export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router, siteData }) {
        app.component('MiruSource', MiruSource);
    }
} satisfies Theme
