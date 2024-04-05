---
title: boolean
titleTemplate: Utilities | miru.ink
description: Simple validate if the passed variable is truly, false or neither of them.
editLink: true
---

# boolean Utilities

Three utility functions to validate if an passed variable is truly, falsy or neither of them. The 
following values are detectable.

```ts
type truly = true | 'true' | 1 | '1' | 'yes' | 'on';
type falsy = false | 'false' | 0 | '0' | 'no' | 'off' | null | undefined;
```

## boolean <Badge text="v0.1.0" />

Checks if the passed value is truly (returns `true`), falsy (returns `false`) or nothing of both 
(returns `null`).

### Declaration

```ts
declare function boolean(value: any): boolean | null;
```

### Examples

```ts
import { boolean } from 'miru.ink/utils/boolean';

console.log( boolean(true) );       // Output: true
console.log( boolean('true') );     // Output: true
console.log( boolean('0') );        // Output: false
console.log( boolean('no') );       // Output: false
console.log( boolean('xyz') );      // Output: null
```

## truly <Badge text="v0.1.0" />

Checks if the passed value is truly or not.

### Declaration

```ts
declare function truly(value: any): boolean;
```

### Examples

```ts
import { truly } from 'miru.ink/utils/boolean';

console.log( truly(true) );       // Output: true
console.log( truly('true') );     // Output: true
console.log( truly('0') );        // Output: false
console.log( truly('no') );       // Output: false
console.log( truly('xyz') );      // Output: false
```

## falsy <Badge text="v0.1.0" />

Checks if the passed value is falsy or not.

### Declaration

```ts
declare function falsy(value: any): boolean;
```

### Examples

```ts
import { falsy } from 'miru.ink/utils/boolean';

console.log( falsy(true) );       // Output: false
console.log( falsy('true') );     // Output: false
console.log( falsy('0') );        // Output: true
console.log( falsy('no') );       // Output: true
console.log( falsy('xyz') );      // Output: false
```
