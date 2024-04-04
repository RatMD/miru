# select <Badge text="v0.1.0" />

A context-based wrapper around the `querySelector` function, which supports using a custom context 
element instead of the default `document` object, and supports additional TypeScript flavour.

## Declaration

```ts
declare function select<T = HTMLElement>(
    selector: string, 
    context?: HTMLElement | Document
): T | null
```

## Examples

```ts
import select from 'miru.ink/utils/select';

console.log( select('#app') );                  // Output: HTMLElement or null
console.log( select('#app', document.body) );   // Output: HTMLElement or null

// TypeScript Support
const button = select<HTMLButtonElement>('button');
if (button) {
    button.disabled = true;     // No "Property x does not exist on y" issue here!
}
```
