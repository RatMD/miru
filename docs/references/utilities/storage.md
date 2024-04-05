---
title: MiruStorage
titleTemplate: Utilities | miru.ink
description: A basic class construct to interact with the Storage Engine in a more common and usable way.
editLink: true
---

# MiruStorage Utility Class

A small utility class providing a more common and safe access to a specific Storage engine and its 
stored data. Supports also using a specific prefix, used for each key, stores data JSON-serialized.

## new MiruStorage <Badge text="v0.1.0" />

Create a new MiruStorage class instance using the passed prefix and storage engine. The storage 
engine can either be `localStorage` or `sessionStorage`.

### Declaration

```ts
declare function constructor(
    prefix?: string | null, 
    storageEngine?: Storage
)
```

## prepare() <Badge text="v0.1.0" />

Internal function to prepare / prefix a passed storage key, as passed on the constructor above.

### Declaration

```ts
declare function prepare(key: string): string
```

## encode() <Badge text="v0.1.0" />

Internal function to encode a specific value before storing them in the used storage engine. Uses 
`JSON.stringify` on objects and arrays. Can, but should not be used from the outside.

### Declaration

```ts
declare function encode(value: unknown): string
```

## decode() <Badge text="v0.1.0" />

Internal function to decode a specific value from the storage engine. Can, but should not be used 
from the outside.

### Declaration

```ts
declare function decode(value: string): unknown
```

## exists() <Badge text="v0.1.0" />

Checks if a specific data key exists or not.

### Declaration

```ts
declare function exists(key: string): boolean
```

## has() <Badge text="v0.1.0" />

This is an alias for `exists()`. Checks if a specific data key exists or not.

### Declaration

```ts
declare function has(key: string): boolean
```

## get() <Badge text="v0.1.0" />

Get a specific value by its key.

### Declaration

```ts
declare function get(key: string, defaultValue?: any): any
```

## all() <Badge text="v0.1.0" />

Return the whole decoded storage.

### Declaration

```ts
declare function all(): { [key: string]: any }
```

## set() <Badge text="v0.1.0" />

Set a specific key: value pair to the storage.

### Declaration

```ts
declare function set(key: string, value: any): void
```

## remove() <Badge text="v0.1.0" />

Remove a specific value by its key.

### Declaration

```ts
declare function remove(key: string): void
```

## delete() <Badge text="v0.1.0" />

This is an alias for `remove()`. Delete a specific value by its key.

### Declaration

```ts
declare function delete(key: string): void
```

## unset() <Badge text="v0.1.0" />

This is an alias for `remove()`. Unset a specific value by its key.

### Declaration

```ts
declare function unset(key: string): void
```

## clear() <Badge text="v0.1.0" />

Clear the whole storage.

### Declaration

```ts
declare function clear(): void
```

## listen() <Badge text="v0.1.0" />

Listen to all changes made within this storage.

### Declaration

```ts
declare function listen(callback: MiruStorageCallback): void
```

## listenTo() <Badge text="v0.1.0" />

Listen to all changes made within this storage, related to a specific storage key.

### Declaration

```ts
declare function listenTo(key: string, callback: MiruStorageCallback): void
```
