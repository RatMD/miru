# resize <Badge text="v0.1.0" />

Crops an image via the browser-native CANVAS API, maintaining the original aspect ratio. Returns 
the new image as base64 encoded string.

## Declaration

```ts
declare function resize(
    original: string, 
    maxWidth: number, 
    maxHeight: number
): Promise<string>
```

The `resize` utility function requires three parameters.

### `original`

The original image, either as file path or as base64-encoded string (or anything else supported by 
`<img src="" />`).

### `maxWidth`

The maximum desired with of the image, used to calculate the new aspect ratio and crop the image 
accordingly.

### `maxHeight`

The maximum desired height of the image, used to calculate the new aspect ratio and crop the image 
accordingly.

## Examples

```ts
import resize from 'miru.ink/utils/resize';

async function onInput(image) {
    const resized = await resize(image, 800, 600);
}
```
