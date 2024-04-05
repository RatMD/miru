---
title: wait
titleTemplate: Utilities | miru.ink
description: Simple wait for a specific amount of time, or wait until something specific happens.
editLink: true
---

# wait Utilities

Two utility functions to wait for a specific time or until something specific happened.

## wait <Badge text="v0.1.0" />

Wait a desired amount of milliseconds until the next part of your your should be executed.

### Declaration

```ts
declare function wait(ms: number): Promise<null>
```

### Examples

```ts
import { wait } from 'miru.ink/utils/wait';

async function handler() {
    await wait(300);
    console.log('Prints this after 300 milliseconds.');
}
```

## waitUntil <Badge text="v0.1.0" />

Wait until a custom callback function returns true or a timeout error occurred.

### Declaration

```ts
declare function waitUntil(
    callback: () => boolean, 
    step: number = 200, 
    limit: number = 100
): Promise<null>
```

The `waitUntil` utility function requires one and supports up to three parameters.

### `callback`

The custom callback function, which should return true to fulfil the promise.

### `step`

The desired amount of milliseconds to wait between the single calls.

### `limit`

The desired number of tries until a timeout occurs.

### Examples

```ts
import { waitUntil } from 'miru.ink/utils/wait';

async function loaded(img) {
    await waitUntil(() => {
        return img.offsetHeight > 0;
    }, 200, 100)
    console.log('Image has been loaded.');
}
```
