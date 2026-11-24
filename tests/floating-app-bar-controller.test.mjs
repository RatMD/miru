import assert from 'node:assert/strict';
import { test } from 'vitest';
import { computed, createRenderer, h, nextTick, ref } from 'vue';
import {
    createFloatingAppBarController,
    provideFloatingAppBar,
    useFloatingAppBar,
} from '../src/composables/useFloatingAppBar.ts';

const icon = { render: () => null };
const config = (variant, key) => ({ variant, primary: { key, icon, label: key } });

test('Vue page scope releases its own bar on unmount while retaining a newer overlay', async () => {
    const makeNode = () => ({ children: [], parent: null });
    const renderer = createRenderer({
        createElement: makeNode,
        createText: makeNode,
        createComment: makeNode,
        patchProp() {},
        setText() {},
        setElementText() {},
        insert(child, parent) {
            child.parent = parent;
            parent.children.push(child);
        },
        remove(child) {
            if (child.parent)
                child.parent.children = child.parent.children.filter((item) => item !== child);
        },
        parentNode: (node) => node.parent,
        nextSibling: () => null,
    });
    const home = config('five', 'home'),
        page = config('three', 'page'),
        camera = config('primary', 'camera');
    let bar;
    const visible = ref(true);
    const Page = {
        setup() {
            assert.equal(useFloatingAppBar(page), bar);
            return () => null;
        },
    };
    const Layout = {
        setup() {
            bar = provideFloatingAppBar(home);
            return () => (visible.value ? h(Page) : null);
        },
    };
    const app = renderer.createApp(Layout);
    app.mount(makeNode());
    assert.equal(bar.current.value, page);
    const closeCamera = bar.push(camera);
    visible.value = false;
    await nextTick();
    assert.equal(bar.current.value, camera);
    closeCamera();
    assert.equal(bar.current.value, home);
    app.unmount();
});

test('nested camera and input bars restore the exact preceding configuration', () => {
    const home = config('five', 'home'),
        input = config('three', 'input'),
        camera = config('primary', 'camera');
    const bar = createFloatingAppBarController(home);
    const closeInput = bar.push(input);
    const closeCamera = bar.push(camera);
    assert.equal(bar.current.value, camera);
    assert.equal(bar.depth.value, 2);
    closeCamera();
    assert.equal(bar.current.value, input);
    closeInput();
    assert.equal(bar.current.value, home);
    assert.equal(bar.depth.value, 0);
});

test('cleanup of an older page does not remove a newer overlay or resurrect disposed state', () => {
    const home = config('five', 'home'),
        page = config('three', 'page'),
        camera = config('primary', 'camera');
    const bar = createFloatingAppBarController(home);
    const releasePage = bar.push(page);
    const releaseCamera = bar.push(camera);
    const key = bar.transitionKey.value;
    releasePage();
    releasePage();
    assert.equal(bar.current.value, camera);
    assert.equal(bar.transitionKey.value, key);
    releaseCamera();
    assert.equal(bar.current.value, home);
});

test('page replacement clears stale temporary layers and old disposers are harmless', () => {
    const bar = createFloatingAppBarController(config('five', 'home'));
    const close = bar.push(config('primary', 'old-camera'));
    const page = config('three', 'new-page');
    bar.set(page);
    close();
    assert.equal(bar.current.value, page);
    assert.equal(bar.depth.value, 0);
});

test('reactive sources, localized labels and disabled state stay live without replacing icon objects', () => {
    const locale = ref('en'),
        disabled = ref(false),
        variant = ref('five');
    const action = {
        key: 'scan',
        icon,
        label: computed(() => (locale.value === 'de' ? 'Scannen' : 'Scan')),
        disabled,
    };
    const bar = createFloatingAppBarController(() => ({ variant: variant.value, primary: action }));
    const key = bar.transitionKey.value;
    locale.value = 'de';
    disabled.value = true;
    assert.equal(bar.current.value.primary.label.value, 'Scannen');
    assert.equal(bar.current.value.primary.disabled.value, true);
    assert.equal(bar.current.value.primary.icon, icon);
    assert.equal(bar.transitionKey.value, key);
    variant.value = 'three';
    assert.notEqual(bar.transitionKey.value, key);
});

test('controllers are isolated and empty pop, clear and reset have defined behavior', () => {
    const home = config('five', 'home');
    const a = createFloatingAppBarController(home),
        b = createFloatingAppBarController(home);
    a.push(config('three', 'input'));
    assert.equal(b.current.value, home);
    a.pop();
    a.pop();
    assert.equal(a.current.value, home);
    a.clear();
    assert.equal(a.current.value, null);
    a.reset();
    assert.equal(a.current.value, home);
});
