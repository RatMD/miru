import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const stepperSummaries: Record<string, string> = {
    Stepper:
        'A sequence of steps for guiding people through a task, with progress indicators and optional content. Supports guarded navigation, asynchronous validation and responsive layouts.',
    StepperList: 'Arrange the step headings and connectors within a scrollable navigation area.',
    StepperItem: 'Register a numbered step with its completion, disabled and error state.',
    StepperTrigger: 'An accessible control for selecting a step through the navigation guards.',
    StepperIndicator: 'Show the step number, a custom icon or a completion tick.',
    StepperLabel: 'Group a step’s title and description for responsive label visibility.',
    StepperTitle: 'Name a step and label its trigger and content region.',
    StepperDescription: 'Add supporting text beneath a step title.',
    StepperSeparator: 'Draw a connector between neighbouring step headings.',
    StepperContent:
        'Display content for the active step, with optional state retention while hidden.',
    StepperActions: 'Provide translated navigation actions, loading feedback and error messages.',
};

export function stepperDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        {
            components: [
                {
                    name: 'Button',
                    url: '/components/button',
                    storybook: '/docs/components-button--docs',
                },
                {
                    name: 'ScrollArea',
                    url: '/components/api/scroll-area',
                    storybook: '/docs/utilities-scrollarea--docs',
                },
            ],
            packages: [
                '@tabler/icons-vue',
                '@vueuse/core',
                'clsx',
                'reka-ui',
                'tailwind-merge',
                'vue',
            ],
            primitives: [
                { name: 'Reka UI Stepper', url: 'https://reka-ui.com/docs/components/stepper' },
            ],
        },
        storybook,
    );
}

type Copy = Partial<Record<'props' | 'events' | 'slots' | 'exposed', Record<string, string>>>;
const classProp = { class: 'Additional CSS classes for this element.' };
export const stepperApiCopy: Record<string, Copy> = {
    Stepper: {
        props: {
            ...classProp,
            modelValue: 'The active step number; bind with v-model to control navigation.',
            defaultValue: 'The initial step number when modelValue is omitted.',
            orientation: 'Arrange the desktop step headings horizontally or vertically.',
            mobileLayout:
                'Use vertical, compact or scroll navigation on small screens, or same to retain the desktop layout.',
            mobile: 'Override viewport detection; omit to detect small screens automatically.',
            mobileBreakpoint: 'The viewport width in pixels below which the mobile layout applies.',
            variant: 'Use connected indicators or a bordered, segmented heading.',
            size: 'Set the indicator size and spacing.',
            color: 'The semantic colour of the active step.',
            completedColor: 'The semantic colour of completed steps.',
            inactiveAppearance: 'The treatment of upcoming step indicators.',
            linear: 'Limit forward navigation to the next registered step.',
            disabled: 'Disable all step selection and navigation actions.',
            loading: 'Show a busy state and prevent navigation while the application is working.',
            error: 'An application-provided error message; takes precedence over local guard errors.',
            beforeChange:
                'Check every navigation request, including backward navigation and completion.',
            beforeNext:
                'Check forward navigation and final completion; return false or a message to remain on the current step.',
            ariaLabel:
                'The accessible name of the step navigation; defaults to the translated label.',
            dir: 'The text direction used for keyboard navigation and layout.',
        },
        events: {
            'update:modelValue':
                'Emitted after an accepted step selection, with the requested step number.',
            change: 'Emitted after accepted navigation, with the previous step, destination and action.',
            complete:
                'Emitted after the final step passes its guards; the application handles submission or navigation.',
            error: 'Emitted when a navigation guard throws or rejects, with the original error.',
        },
        slots: {
            default:
                'The step navigation, content and actions; exposes the current state and guarded navigation methods.',
        },
        exposed: {
            modelValue: 'The current step number.',
            busy: 'Whether application loading or a pending guard prevents navigation.',
            nextStep:
                'Request the next registered step; resolves to whether the request was accepted.',
            prevStep:
                'Request the previous registered step; resolves to whether the request was accepted.',
            goToStep:
                'Request a registered step through the guards; resolves to whether the request was accepted.',
            complete:
                'Validate the final step and emit complete; resolves to whether completion was accepted.',
            clearError:
                'Clear the local guard error; application-provided error messages remain controlled by the error prop.',
        },
    },
    StepperList: {
        props: classProp,
        slots: { default: 'The registered step headings and their connectors.' },
    },
    StepperItem: {
        props: {
            ...classProp,
            step: 'The unique step number; use consecutive positive numbers starting at 1.',
            completed:
                'Mark this step as completed; earlier steps also receive completed indicator styling.',
            disabled: 'Prevent navigation to this step.',
            error: 'Mark this step as invalid, optionally with an error message.',
        },
        slots: {
            default:
                'The step heading and optional inline content; exposes the primitive state and resolved error.',
        },
    },
    StepperTrigger: {
        props: {
            ...classProp,
            as: 'The HTML element or Vue component to render.',
            asChild: 'Merge trigger behaviour and attributes into a single child element.',
        },
        slots: { default: 'The step indicator and label.' },
    },
    StepperIndicator: {
        props: {
            ...classProp,
            icon: 'An optional Vue icon component shown instead of the step number.',
            showCheck: 'Replace the number or icon with a tick for completed steps.',
        },
        slots: {
            default:
                'Custom indicator content; exposes the step number and active, completed and error states.',
        },
    },
    StepperLabel: {
        props: classProp,
        slots: {
            default:
                'The title and description; inactive labels are hidden in compact mobile mode.',
        },
    },
    StepperTitle: { props: classProp, slots: { default: 'The accessible title of this step.' } },
    StepperDescription: { props: classProp, slots: { default: 'Supporting text for this step.' } },
    StepperSeparator: { props: classProp },
    StepperContent: {
        props: {
            ...classProp,
            step: 'The step this content belongs to; inferred when nested within StepperItem.',
            forceMount: 'Keep inactive content mounted but hidden to retain local control state.',
        },
        slots: { default: 'The step content; exposes its step number and whether it is active.' },
    },
    StepperActions: {
        props: {
            ...classProp,
            showPrevious: 'Show the previous-step action.',
            showNext: 'Show the next-step action, or the completion action on the final step.',
            previousLabel: 'Override the translated previous-step label.',
            nextLabel: 'Override the translated next-step label.',
            completeLabel: 'Override the translated completion label.',
            variant: 'The colour treatment of the next and completion button.',
            size: 'The size of the navigation buttons.',
        },
        slots: {
            default:
                'Replace the navigation buttons; exposes guarded actions, busy state, errors and final-step state.',
            message:
                'Add supporting content beneath the error feedback; exposes the resolved error message.',
        },
    },
};
