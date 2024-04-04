# uuid <Badge text="v0.1.0" />

Creates a randomly generated UUID ([Universal unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)) 
using the browser-native [WebAPI Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto). 
The generated UUID can also be associated with a string or Symbol, to receive the same UUID at 
another location in your script.

This utility function relies on [polyfill-crypto-methods](https://www.npmjs.com/package/polyfill-crypto-methods) 
to add support for older devices.

## Declaration

```ts
declare function uuid(id?: string | Symbol | null): string;
```

## Examples

```ts
import uuid from 'miru.ink/utils/uuid';

console.log( uuid() );          // Output: 76cddcfa-7afe-40d8-b873-d2c20323eb07
console.log( uuid('test') );    // Output: 343386d8-5abd-4b90-9213-acd59e5234f4
console.log( uuid() );          // Output: ceeb5443-6ac7-4faa-9170-3f97dd7f44ae
console.log( uuid('test') );    // Output: 343386d8-5abd-4b90-9213-acd59e5234f4
```
