import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Manually authored text shared by Storybook controls and the VitePress reference. */
export const buttonSummaries: Record<string, string> = {
    Button: 'A button for actions and links, with theme colours, sizes and shapes. Supports icons, loading feedback and disabled states with a visible keyboard focus indicator.',
    ButtonAction:
        'A compact action button centred on an icon, with an optional visible label. Supports muted styling, configurable borders and status dots alongside loading and disabled states.',
    ButtonGroup:
        'A group of related buttons joined with shared outer corners. Arrange independent actions horizontally or vertically while preserving each button’s styling and behaviour.',
    ButtonShadow:
        'A round icon button with an expanding halo on hover and keyboard focus. Add a status dot, status ring or countdown ring to show contextual feedback.',
};
const ui = (name: string, slug: string, storybook: string) => ({
    name,
    url: '/components/api/' + slug,
    storybook: '/docs/' + storybook + '--docs',
});
const actionUi = [
    ui('Button', 'button', 'components-button'),
    ui('Indicator', 'indicator', 'components-indicator'),
];
export function buttonDependencyMarkdown(name: string, storybook = false) {
    const dependencies =
        name === 'Button'
            ? {
                  packages: [
                      'class-variance-authority',
                      'clsx',
                      'reka-ui',
                      'tailwind-merge',
                      'vue',
                  ],
                  primitives: [
                      {
                          name: 'Reka UI Primitive',
                          url: 'https://reka-ui.com/docs/utilities/primitive',
                      },
                  ],
              }
            : name === 'ButtonGroup'
              ? {
                    components: [
                        ui('Button', 'button', 'components-button'),
                        ui('ButtonAction', 'button-action', 'components-buttonaction'),
                    ],
                    packages: ['clsx', 'tailwind-merge', 'vue'],
                }
              : {
                    components: actionUi,
                    packages: ['@vueuse/core', 'clsx', 'tailwind-merge', 'vue'],
                };
    return componentDependenciesMarkdown(dependencies, storybook);
}
const commonProps = {
    class: 'Additional CSS classes for the button.',
    as: 'The HTML element or Vue component to render.',
    asChild: 'Merge button behaviour and attributes into the child element.',
    variant: 'Set the button colour or visual variant.',
    size: 'Set the button dimensions, spacing and icon size.',
    shape: 'Choose the standard corners or a fully rounded shape.',
    disabled: 'Prevent activation and show the disabled appearance.',
    loading: 'Show a loading indicator and prevent activation.',
    loadingPosition: 'Place the loading indicator before or after the slot content.',
};
const linkProps = {
    href: 'Render a link to this destination; takes precedence over as.',
    target: 'The browsing context in which to open the link.',
    rel: 'The relationship between the current document and the link destination.',
    type: 'The native button type; ignored when href is supplied.',
    title: 'The native tooltip text and fallback accessible name.',
};
const statusProps = {
    statusDot: 'Show a status dot: true follows the variant, or supply a theme or CSS colour.',
    statusDotPulse: 'Pulse the status dot when it is shown.',
    statusDotPing: 'Animate an outward ping around the status dot when it is shown.',
};
type Copy = {
    props: Record<string, string>;
    slots?: Record<string, string>;
    events?: Record<string, string>;
    defaults?: Record<string, string>;
    exposed?: Record<string, string>;
};
export const buttonApiCopy: Record<string, Copy> = {
    Button: {
        props: { ...commonProps, iconOnly: 'Use equal width and height for an icon-only action.' },
        slots: { default: 'The button label, icons or composed child element.' },
        defaults: { asChild: 'false' },
    },
    ButtonAction: {
        props: {
            ...commonProps,
            ...linkProps,
            ...statusProps,
            variant: 'Set the action colour; ghost and ghostly are excluded.',
            borderless:
                'Show the border always (no), during interaction or disabled states (effect), or never (yes).',
            iconOnly: 'Use icon-only dimensions when no visible label is supplied.',
            muted: 'Mute the resting icon and text; inherits the surrounding action defaults when omitted.',
            label: 'The visible label after the icon and the preferred accessible name.',
        },
        slots: { default: 'The action icon, or custom content when iconOnly is disabled.' },
        defaults: {
            asChild: 'false',
            disabled: 'false',
            loading: 'false',
            loadingPosition: '"start"',
            statusDotPulse: 'false',
            statusDotPing: 'false',
        },
    },
    ButtonGroup: {
        props: {
            class: 'Additional CSS classes for the group.',
            orientation: 'Arrange the child buttons horizontally or vertically.',
            size: 'Match the contained buttons’ size to set the group corners.',
            shape: 'Match the contained buttons’ shape to set the group corners.',
            label: 'The accessible name of the button group.',
        },
        slots: { default: 'The independent buttons or links to join.' },
    },
    ButtonShadow: {
        props: {
            class: commonProps.class,
            as: commonProps.as,
            asChild: commonProps.asChild,
            variant: commonProps.variant,
            size: commonProps.size,
            disabled: commonProps.disabled,
            loading: commonProps.loading,
            ...linkProps,
            ...statusProps,
            muted: 'Mute the resting icon unless iconColor supplies an explicit colour.',
            label: 'The accessible name of the icon-only action.',
            iconColor: 'Override the icon colour independently of the button variant.',
            statusRing: 'Show a ring using the variant colour, or supply another button variant.',
            timerRing: 'Show the countdown ring in place of the status ring.',
            timerDuration: 'The internal countdown duration, in milliseconds.',
            timerProgress:
                'Override the remaining progress from 0 to 100; null enables the internal countdown.',
            timerPaused: 'Pause the internal countdown.',
            timerColor:
                'Override the timer colour; otherwise follows iconColor or the button variant.',
        },
        slots: { default: 'The action icon.' },
        events: { 'timer-end': 'Emitted once when the enabled timer ring reaches zero.' },
        exposed: {
            restartTimer: 'Reset the internal countdown and allow another completion event.',
        },
        defaults: {
            asChild: 'false',
            disabled: 'false',
            loading: 'false',
            statusDotPulse: 'false',
            statusDotPing: 'false',
        },
    },
};
export const buttonNotes: Record<string, { title: string; text: string }[]> = {
    button: [
        {
            title: 'Actions, links and loading',
            text: 'Button renders a native button with `type="button"` by default; supply the native `type` attribute for form submission. Use `as="a"` with `href`, or `asChild` with a router link. `loading` prevents activation and replaces slot SVG icons with a spinner. `loadingPosition` controls its side. Provide an accessible name when using `iconOnly`.',
        },
    ],
    'button-action': [
        {
            title: 'Labels and appearance',
            text: 'Put the icon in the default slot. `label` adds visible text and supplies the accessible name; otherwise use `title` or `aria-label`. The `muted` setting can be inherited from AccordionHeader and overridden on each action. `borderless="no"` keeps the border visible, `effect` reveals it during interaction or disabled states, and `yes` hides it.',
        },
        {
            title: 'Status dots',
            text: 'Use `statusDot=true` to follow the variant, a theme colour or CSS colour for an independent status, or false to hide the dot. `statusDotPulse` and `statusDotPing` add optional animations. Dots are decorative and hidden while loading, so include their meaning in the accessible label. An `href` turns the action into a link.',
        },
    ],
    'button-group': [
        {
            title: 'Composition and state',
            text: 'Supply direct Button or ButtonAction children and give the group an accessible `label`. Set the same `size` and `shape` on the group and its buttons: the group controls the outer corners without changing child props. Each child owns its variant, disabled state and click handling. Tab visits the individual enabled buttons; use ToggleGroup when managing a selected value.',
        },
    ],
    'button-shadow': [
        {
            title: 'Icon colours and status',
            text: 'The default slot contains the icon. Supply `label`, `title` or `aria-label` as its accessible name. `iconColor` sets the icon colour independently; `muted` affects the resting icon when no explicit icon colour is supplied. Status dots use the same options as ButtonAction. `statusRing` adds a ring, and an enabled `timerRing` takes precedence over it.',
        },
        {
            title: 'Countdown control',
            text: 'The internal countdown starts when the component mounts with `timerRing` enabled. `timerDuration` is in milliseconds and `timerPaused` pauses the countdown. Set `timerProgress` to a remaining percentage for externally controlled progress, or null to use the internal timer. The `timer-end` event fires at zero. Call `restartTimer()` through a template ref to reset the internal countdown; a controlled timer also needs its external progress updated.',
        },
    ],
};

