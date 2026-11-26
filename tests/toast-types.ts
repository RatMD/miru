import type { ToastId, ToasterProps } from '@rat.md/miru';
import { h } from 'vue';
import { toast } from '@rat.md/miru';
import { useToast } from '@rat.md/miru/composables';
import { createMiru } from '@rat.md/miru/miru';

const settings: ToasterProps = {
    id: 'workspace',
    position: 'top-center',
    swipeDirection: 'up',
    disableSwipe: false,
    appearance: 'flat',
    toastOptions: { duration: 5000, classes: { title: 'font-bold' } },
};
createMiru({ toast: settings });
const notifications = useToast({ toasterId: () => settings.id });
const id: ToastId = notifications.success('Saved', {
    action: { label: 'Undo', closeOnClick: false, onClick: (event) => event.preventDefault() },
});
notifications.update(id, { title: 'Synced', type: 'info' });
notifications.dismiss(id);
toast(h('strong', 'Saved'), { description: () => h('span', 'Your document is ready') });
const handle = notifications.promise(Promise.resolve({ id: 42 }), {
    loading: 'Saving',
    success: (document) => ({ message: 'Saved', description: String(document.id) }),
    error: 'Failed',
});
const result: Promise<{ id: number }> = handle.unwrap();
const promiseId: ToastId = handle.id;
void result;
void promiseId;
// @ts-expect-error Toasts accept the documented viewport positions.
createMiru({ toast: { position: 'middle' } });
// @ts-expect-error Reka supports these four swipe directions.
createMiru({ toast: { swipeDirection: 'diagonal' } });
