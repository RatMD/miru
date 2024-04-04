# reader <Badge text="v0.1.0" />

A simple interface around the browser native [WebAPI FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader), 
which reads the whole content of a passed `File` object. The function returns a Promise, which is
 either resolve'd with the read content or reject'ed.

## Declaration

```ts
declare function reader(file: File): Promise<string | ArrayBuffer | null>
```

## Examples

```ts
import reader from 'miru.ink/utils/reader';

uploadField.addEventListener(async (event) => {
    if (event.files.length > 0) {
        const content = await reader(event.files[0]);
        console.log( content );  // Output: ArrayBuffer, Text Content or null
    }
});
```
