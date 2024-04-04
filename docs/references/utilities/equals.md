# equals <Badge text="v0.1.0" />

> Source: [github.com/NickGard/tiny-isequal](https://github.com/NickGard/tiny-isequal/blob/master/src/index.js), slightly modified by rat.md.

Checks whether two objects, including arrays of course, are identical or not. The check is recursive, 
so also supports deeply nested objects, and of course also ignores sorting.

## Declaration

```ts
declare function equals(a: any, b: any): boolean
```

## Examples

```ts
import equals from 'miru.ink/utils/equals';

const objectA = { value: true };
const objectB = { value: true };
const objectC = { value: false };

console.log( equals(objectA, objectB) );  // Output: true
console.log( equals(objectA, objectC) );  // Output: false
```
