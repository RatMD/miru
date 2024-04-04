# debounce <Badge text="v0.1.0" />

Wraps a custom function into a debounce handler. The debounce handler ensures that the passed 
function is called only after a certain period of inactivity.

> [!NOTE]
> The difference to `throttle` is that `debounce` ONLY executes the function when a certain 
> event/action no longer occurs for the desired time, whereas `throttle` triggers the function 
> directly on the first call and prevents the next call until the desired time has elapsed.

## Declaration

```ts
declare function debounce(callback: Function, ms: number): Function
```

## Examples

```ts
import debounce from 'miru.ink/utils/debounce';

const debounceCallback = debounce(() => {
    console.log('Logs only once, after 350 ms of inactivity.')
}, 350);

input.addEventListener('input', debounceCallback);
```
