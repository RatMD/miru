
import Colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './.storybook/**/*.{js,jsx,ts,tsx,vue}',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gray: Colors.zinc,
                primary: Colors.indigo,
                danger: Colors.red,
                warning: Colors.amber,
                success: Colors.emerald,
                info: Colors.sky
            },
            fontFamily: {
                header: [
                    'ui-sans-serif', 
                    'system-ui', 
                    'sans-serif', 
                    '"Apple Color Emoji"', 
                    '"Segoe UI Emoji"', 
                    '"Segoe UI Symbol"', 
                    '"Noto Color Emoji"'
                ]
            }
        },

        screens: {
            'xxs': '364px',
            'xs': '576px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            'xxl': '1536px',
        }
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
};
