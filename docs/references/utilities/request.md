# request <Badge text="v0.1.0" />

A simple interface around the browser-native [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 
function, which catches HTTP and server errors and returns them normalised. In addition to the main 
`request` function, the object also provides additional sub-functions for the single HTTP methods 
using the same parameter-signature.

## Declaration

```ts
interface ResponseSuccess<S> {
    status: 'success';
    result: S;
}

interface ResponseError<E> {
    status: 'error';
    message: string;
    details?: E;
}

type Response<S, E> = ResponseSuccess<S> 
                    | ResponseError<E>;

type Resource = string | URL;

type Payload = ArrayBuffer 
             | Blob 
             | DataView 
             | FormData 
             | ReadableStream 
             | URLSearchParams 
             | { [key: string]: string }
             | null;

declare function request<S = any, E = any>(
    resource: Resource, 
    payload: Payload = null, 
    options: Omit<RequestInit, 'body'> = {}
): Promise<Response<S, E>>

declare namespace request {
    function get:    <S = any, E = any>( /* See request */ ): /* See request */
    function head:   <S = any, E = any>( /* See request */ ): /* See request */
    function patch:  <S = any, E = any>( /* See request */ ): /* See request */
    function post:   <S = any, E = any>( /* See request */ ): /* See request */
    function put:    <S = any, E = any>( /* See request */ ): /* See request */
    function delete: <S = any, E = any>( /* See request */ ): /* See request */
}
```

## Examples

```ts
import request from 'miru.ink/utils/request';

async function main() {
    try {
        const response = await request('/get/some/data', null, {
            method: 'GET'
        });
    } catch (err) { }

    /** Same as */
    try {
        const response = await request.get('/get/some/data');
    } catch (err) { }
}
```
