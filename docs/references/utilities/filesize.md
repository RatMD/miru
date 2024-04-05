---
title: filesize
titleTemplate: Utilities | miru.ink
description: Simple convert seemingly endless number of bytes into human-readable formats. 
editLink: true
---

# filesize <Badge text="v0.1.0" />

> Source: [stackoverflow.com/a/14919494](https://stackoverflow.com/a/14919494), slightly modified by rat.md.

Converts a seemingly endless number of bytes into a human-readable format.

## Declaration

```ts
declare function filesize(
    bytes: number, 
    metric: boolean = false, 
    digits: number = 1
): string 
```

The `filesize` utility function requires one and supports up to three parameters.

### `bytes`

The number of bytes to be converted.

### `metric`

Whether the metric system or binary system should be used, defaults to `false`.

### `digits`

The number of digits to appear after the decimal point, defaults to `1`.

## Examples

```ts
import filesize from 'miru.ink/utils/filesize';

console.log( filesize(4194304) );           // Output: 4.0 MiB
console.log( filesize(4194304, true, 3) );  // Output: 4.194 MB
```
