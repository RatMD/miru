import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config

export default defineConfig({
    title: "miru.ink",
    description: "Vue3 Component Library",
    head: process.env.NODE_ENV == 'production' ? [
        [
            'script',
            { 
                defer: '', 
                src: 'https://umami.rat.md/script.js',
                "data-website-id": '3030ad2b-5c81-4216-b6ff-67079b288bfe'
            }
        ]
    ] : [],

    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {
        search: {
            provider: 'local'
        },

        lastUpdated: {
            text: 'Last updated at'
        },

        editLink: {
            pattern: 'https://github.com/RatMD/miru/edit/master/docs/:path',
            text: 'Improve this page on GitHub'
        },

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
            { text: 'References', link: '/references/', activeMatch: '/references/' }
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
            ],
            '/references/': [
                {
                    text: 'References',
                    link: '/references/',
                },
                {
                    text: 'Components',
                    link: '/references/components/',
                    collapsed: true,
                    items: [
                        { 
                            text: 'Accordion', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'AccordionTab',
                                    link: '/references/components/accordion/accordion-tab'
                                },
                                {
                                    text: 'AccordionGroup',
                                    link: '/references/components/accordion/accordion-group'
                                },
                            ]
                        },
                        { 
                            text: 'Alert', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'AlertStd',
                                    link: '/references/components/alert/alert-std'
                                },
                                {
                                    text: 'AlertMessage',
                                    link: '/references/components/alert/alert-message'
                                }
                            ]
                        },
                        { 
                            text: 'Avatar', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'AvatarStd', 
                                    link: '/references/components/avatar/avatar-std'
                                },
                                {
                                    text: 'AvatarGroup', 
                                    link: '/references/components/avatar/avatar-group'
                                }
                            ]
                        },
                        { 
                            text: 'Badge', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'BadgeStd', 
                                    link: '/references/components/badge/badge-std'
                                },
                                {
                                    text: 'SlimBadge', 
                                    link: '/references/components/badge/slim-badge'
                                }
                            ]
                        },
                        { 
                            text: 'Button', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'ButtonStd', 
                                    link: '/references/components/button/button-std'
                                },
                                {
                                    text: 'ButtonGroup', 
                                    link: '/references/components/button/button-group'
                                },
                                {
                                    text: 'ActionButton', 
                                    link: '/references/components/button/action-button'
                                },
                                {
                                    text: 'ShadowButton', 
                                    link: '/references/components/button/shadow-button'
                                }
                            ]
                        },
                        { 
                            text: 'Card', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'CardStd', 
                                    link: '/references/components/card/card-std'
                                },
                                {
                                    text: 'CardCollapse', 
                                    link: '/references/components/card/card-collapse'
                                }
                            ]
                        },
                        { 
                            text: 'Dialog', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'DialogStd', 
                                    link: '/references/components/dialog/dialog-std'
                                },
                                {
                                    text: 'ConfirmDialog', 
                                    link: '/references/components/dialog/confirm-dialog'
                                }
                            ]
                        },
                        { 
                            text: 'Divider', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'DividerStd', 
                                    link: '/references/components/divider/divider-std'
                                }
                            ]
                        },
                        { 
                            text: 'Form', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'FormStd', 
                                    link: '/references/components/form/form-std'
                                },
                                {
                                    text: 'FormFieldset', 
                                    link: '/references/components/form/form-fieldset'
                                },
                                {
                                    text: 'FormFieldGroup', 
                                    link: '/references/components/form/form-field-group'
                                },
                                {
                                    text: 'FormControl', 
                                    link: '/references/components/form/form-control'
                                },
                                {
                                    text: 'FormWizard', 
                                    link: '/references/components/form/form-wizard'
                                },
                                {
                                    text: 'FormWizardPage', 
                                    link: '/references/components/form/form-wizard-page'
                                }
                            ]
                        },
                        { 
                            text: 'Form Controls', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'BalloonSelector', 
                                    link: '/references/components/form-control/balloon-selector'
                                },
                                {
                                    text: 'CalendarField', 
                                    link: '/references/components/form-control/calendar-field'
                                },
                                {
                                    text: 'CheckboxField', 
                                    link: '/references/components/form-control/checkbox-field'
                                },
                                {
                                    text: 'ColorPicker', 
                                    link: '/references/components/form-control/color-picker'
                                },
                                {
                                    text: 'DateTimePicker', 
                                    link: '/references/components/form-control/date-time-picker'
                                },
                                {
                                    text: 'InputField', 
                                    link: '/references/components/form-control/input-field'
                                },
                                {
                                    text: 'NumberField', 
                                    link: '/references/components/form-control/number-field'
                                },
                                {
                                    text: 'PasswordField', 
                                    link: '/references/components/form-control/password-field'
                                },
                                {
                                    text: 'PriceField', 
                                    link: '/references/components/form-control/price-field'
                                },
                                {
                                    text: 'RadioField', 
                                    link: '/references/components/form-control/radio-field'
                                },
                                {
                                    text: 'RangeSlider', 
                                    link: '/references/components/form-control/range-slider'
                                },
                                {
                                    text: 'SelectableList', 
                                    link: '/references/components/form-control/selectable-list'
                                },
                                {
                                    text: 'SelectField', 
                                    link: '/references/components/form-control/select-field'
                                },
                                {
                                    text: 'SwitchField', 
                                    link: '/references/components/form-control/switch-field'
                                },
                                {
                                    text: 'TextareaField', 
                                    link: '/references/components/form-control/textarea-field'
                                },
                                {
                                    text: 'TimeFrameField', 
                                    link: '/references/components/form-control/time-frame-field'
                                },
                            ]
                        },
                        { 
                            text: 'Loading', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'LoadingSpinner', 
                                    link: '/references/components/loading/loading-spinner'
                                },
                                {
                                    text: 'PlaceholderSkeleton', 
                                    link: '/references/components/loading/placeholder-skeleton'
                                },
                                {
                                    text: 'ProgressBar', 
                                    link: '/references/components/loading/progress-bar'
                                }
                            ]
                        },
                        { 
                            text: 'Offcanvas', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'OffcanvasStd', 
                                    link: '/references/components/offcanvas/offcanvas-std'
                                },
                                {
                                    text: 'BottomSheet', 
                                    link: '/references/components/offcanvas/bottom-sheet'
                                }
                            ]
                        },
                        { 
                            text: 'Pagination', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'AdvancedPagination', 
                                    link: '/references/components/pagination/advanced-pagination'
                                },
                                {
                                    text: 'SimplePagination', 
                                    link: '/references/components/pagination/simple-pagination'
                                }
                            ]
                        },
                        { 
                            text: 'Popover', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'PopoverStd', 
                                    link: '/references/components/popover/popover-std'
                                },
                                {
                                    text: 'ContextMenu', 
                                    link: '/references/components/popover/context-menu'
                                }
                            ]
                        },
                        { 
                            text: 'Support', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'BackdropSupport', 
                                    link: '/references/components/support/backdrop-support'
                                },
                                {
                                    text: 'BreakpointSupport', 
                                    link: '/references/components/support/breakpoint-support'
                                },
                                {
                                    text: 'CollapseSupport', 
                                    link: '/references/components/support/collapse-support'
                                },
                                {
                                    text: 'DeferredSupport', 
                                    link: '/references/components/support/deferred-support'
                                },
                                {
                                    text: 'FloatingSupport', 
                                    link: '/references/components/support/floating-support'
                                }
                            ]
                        },
                        { 
                            text: 'Tab', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'TabGroup', 
                                    link: '/references/components/tab/tab-group'
                                },
                                {
                                    text: 'TabPane', 
                                    link: '/references/components/tab/tab-pane'
                                }
                            ]
                        },
                        { 
                            text: 'Table', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'TableStd', 
                                    link: '/references/components/table/table-std'
                                },
                                {
                                    text: 'TableColumn', 
                                    link: '/references/components/table/table-column'
                                }
                            ]
                        },
                        { 
                            text: 'Tooltip', 
                            collapsed: true,
                            items: [
                                {
                                    text: 'TooltipStd', 
                                    link: '/references/components/tooltip/tooltip-std'
                                }
                            ]
                        },
                    ],
                },
                {
                    text: 'Composables',
                    link: '/references/composables/',
                    collapsed: true,
                    items: [
                        {
                            text: 'Client',
                            link: '/references/composables/client'
                        },
                        {
                            text: 'Form',
                            link: '/references/composables/form'
                        },
                        {
                            text: 'Storage',
                            link: '/references/composables/storage'
                        },
                        {
                            text: 'Worker',
                            link: '/references/composables/worker'
                        },
                    ]
                },
                {
                    text: 'Directives',
                    link: '/references/directives/',
                    collapsed: true,
                    items: [
                        {
                            text: 'v-click-outside',
                            link: '/references/directives/v-click-outside'
                        },
                        {
                            text: 'v-filesize',
                            link: '/references/directives/v-filesize'
                        },
                        {
                            text: 'v-tooltip',
                            link: '/references/directives/v-tooltip'
                        }
                    ]
                },
                {
                    text: 'Utilities',
                    link: '/references/utilities/',
                    collapsed: true,
                    items: [
                        {
                            text: 'boolean',
                            link: '/references/utilities/boolean'
                        },
                        {
                            text: 'debounce',
                            link: '/references/utilities/debounce'
                        },
                        {
                            text: 'equals',
                            link: '/references/utilities/equals'
                        },
                        {
                            text: 'filesize',
                            link: '/references/utilities/filesize'
                        },
                        {
                            text: 'levenshtein',
                            link: '/references/utilities/levenshtein'
                        },
                        {
                            text: 'now',
                            link: '/references/utilities/now'
                        },
                        {
                            text: 'query',
                            link: '/references/utilities/query'
                        },
                        {
                            text: 'reader',
                            link: '/references/utilities/reader'
                        },
                        {
                            text: 'ready',
                            link: '/references/utilities/ready'
                        },
                        {
                            text: 'request',
                            link: '/references/utilities/request'
                        },
                        {
                            text: 'resize',
                            link: '/references/utilities/resize'
                        },
                        {
                            text: 'select',
                            link: '/references/utilities/select'
                        },
                        {
                            text: 'storage',
                            link: '/references/utilities/storage'
                        },
                        {
                            text: 'throttle',
                            link: '/references/utilities/throttle'
                        },
                        {
                            text: 'uuid',
                            link: '/references/utilities/uuid'
                        },
                        {
                            text: 'wait',
                            link: '/references/utilities/wait'
                        }
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
