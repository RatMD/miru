import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "miru.ink",
    description: "Vue3 Component Library",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' }
        ],

        sidebar: {
            '/guide/': [
                {
                    text: 'Setup',
                    items: [
                        { text: 'Introduction', link: '/guide/' },
                        { text: 'Installation', link: '/guide/installation' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/rat.md/miru' }
        ]
    },
    vite: {
        server: {
            port: 8190
        }
    }
});
