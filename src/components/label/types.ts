import type { ValidationProps } from '../field/validation';
import type { LabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
export type UiLabelProps = LabelProps &
    ValidationProps & {
        required?: boolean;
        showValidation?: boolean;
        class?: HTMLAttributes['class'];
    };
