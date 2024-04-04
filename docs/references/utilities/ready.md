# ready <Badge text="v0.1.0" />

A simple event listener that calls a callback function or resolves a promise after the document has 
been fully loaded, (but before all media have been loaded). This function resolves immediately / 
calls the function directly, if the document has already been loaded.

## Declaration

```ts
type Callback = (this: Document, ev?: Event) => any;

declare function ready(): Promise<null>
declare function ready(factory: Callback): void

declare function ready(factory?: Callback): void | Promise<null>
```

## Examples

```ts
import ready from 'miru.ink/utils/ready';

// Within an async function
async function main() {
    await ready();
    console.log('ready');
}

// Used with callback
ready(() => {
    console.log('ready');
});
```
