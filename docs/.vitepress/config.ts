import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "miru.ink",
    description: "Vue3 Component Library",

    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {
        search: {
            provider: 'local'
        },

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/', activeMatch: '/guide/' }
        ],

        sidebar: {
            '/guide/': [
                {
                    text: 'Setup',
                    items: [
                        { text: 'Introduction', link: '/guide/' },
                        { text: 'Getting Started', link: '/guide/getting-started' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/ratmd/miru' }
        ]
    },
    vite: {
        server: {
            port: 8190
        }
    }
});
