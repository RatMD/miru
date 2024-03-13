import './preview.css';
import '../src/styles/miru.css';

import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import { setup, type Preview } from '@storybook/vue3';
import React from 'react';

import DarkTheme from './themes/DarkTheme';
import LightTheme from './themes/LightTheme';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            sort: 'alpha',
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            }
        },
        darkMode: {
            dark: DarkTheme,
            light: LightTheme,
            classTarget: 'html',
            stylePreview: true
        },
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <div className={'prose prose-lg'}>
                        <Description />
                    </div>
                    <Primary />
                    <Controls />
                    <div className={'stories'}>
                        <Stories />
                    </div>
                </>
            ),
        }
    },
};

setup(async (app) => {
    
});

export default preview;
