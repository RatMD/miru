# throttle <Badge text="v0.1.0" />

Wraps a custom function into a throttle handler. The throttle handler limits the rate at which the 
passed function is called.

> [!NOTE]
> The difference to `debounce` is that `throttle` triggers the function directly on the first call 
> and prevents the next call until the desired time has elapsed, whereas `debounce` ONLY executes 
> the function when a certain event/action no longer occurs for the desired time.

## Declaration

```ts
type ThrottleCallback = (...args: any) => void | Promise<void>

declare function throttle(callback: ThrottleCallback, ms: number): Function
```

## Examples

```ts
import throttle from 'miru.ink/utils/throttle';

const throttleCallback = throttle(() => {
    console.log('Logs only once, after 350 ms o inactivity.')
}, 350);

window.addEventListener('resize', throttleCallback);
```
