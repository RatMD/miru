<script lang="ts">
import type { ToastContent } from './types';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ToastValue',
    props: { value: { type: null as unknown as PropType<ToastContent> } },
    setup: (props) => () => (typeof props.value === 'function' ? props.value() : props.value),
});
</script>
