import './styles/styles.css';

import type { Theme } from 'vitepress';

import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import MiruSource from './components/MiruSource.vue';
import MiruTable from './components/MiruTable.vue';

import FilesizeDirective from '../../../src/directives/filesize';
import OutsideDirective from '../../../src/directives/outside';
import TooltipDirective from '../../../src/directives/tooltip';

// https://vitepress.dev/guide/custom-theme
export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router, siteData }) {
        app.directive('click-outside', OutsideDirective);
        app.directive('filesize', FilesizeDirective);
        app.directive('tooltip', TooltipDirective);

        app.component('MiruSource', MiruSource);
        app.component('MiruTable', MiruTable);
    }
} satisfies Theme
