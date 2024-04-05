---
title: query
titleTemplate: Utilities | miru.ink
description: Simple query DOM Elements in a context-based manner using an additional custom mapping function.
editLink: true
---

# query <Badge text="v0.1.0" />

A context-based wrapper around the `querySelectorAll` function, which provides an additional mapping 
function using `Array.from` to modify the returning result. This function always returns an array,
however, the content can either be the HTMLElements or anything returned by the custom mapper.

## Declaration

```ts
type MapFunction<T> = (v: HTMLElement, k: number) => T;

declare function query(selector: string): HTMLElement[]
declare function query(selector: string, context: HTMLElement | Document): HTMLElement[]
declare function query<T = HTMLElement>(selector: string, callback: MapFunction<T>): HTMLElement[]
declare function query<T = HTMLElement>(selector: string, context: HTMLElement | Document, callback: MapFunction<T>): T[]

declare function query<T = HTMLElement>(
    selector: string, 
    context_or_callback?: HTMLElement | Document | MapFunction<T>, 
    callback?: MapFunction<T>
): T[] | HTMLElement[]
```

The `query` utility function requires one and supports up to three parameters. However, you can omit 
the second one in favour of third one as well.

### `selector`

The selector string itself, which should be executed on the context.

### `context`

The desired context, can either be a specific HTMLElement or a document object, uses `document` as 
default.

### `callback`

An additional callback handler, which is passed to `Array.from`, to allow changing the returning 
result.

## Examples

```ts
import query from 'miru.ink/utils/query';

// Select all buttons
var result = query('button');

// Select all buttons on the #app container
var result = query('button', document.getElementById('app'));

// Select all enabled buttons
var result = query(
    'button', 
    el => el.disabled ? null : el       // Replace disabled buttons with `null`
).filter(el => !!el);                   // Filter out `null`
```
