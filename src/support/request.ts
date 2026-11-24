interface ResponseSuccess<S> {
    status: 'success';
    result: S;
}
interface ResponseError<E> {
    status: 'error';
    message: string;
    details?: E;
}
type Response<S, E> = ResponseSuccess<S> | ResponseError<E>;
type Resource = string | URL;
type Payload = BodyInit | Record<string, string> | null;

/**
 * Send a JSON-oriented HTTP request and normalize its result.
 * @param resource Request URL.
 * @param payload Body or query parameters, depending on the HTTP method.
 * @param options Fetch options excluding the request body.
 * @returns A promise containing a success or error response.
 */
async function request<S = unknown, E = unknown>(
    resource: Resource,
    payload: Payload = null,
    options: Omit<RequestInit, 'body'> = {},
): Promise<Response<S, E>> {
    const init: RequestInit = { ...options, method: (options.method ?? 'POST').toUpperCase() };
    let url = resource.toString();

    if (init.method === 'GET' || init.method === 'HEAD') {
        const query =
            payload == null
                ? ''
                : new URLSearchParams(
                      payload as string | URLSearchParams | Record<string, string>,
                  ).toString();

        if (query) {
            const hashAt = url.indexOf('#');
            const hash = hashAt < 0 ? '' : url.slice(hashAt);
            const base = hashAt < 0 ? url : url.slice(0, hashAt);
            url = base + (base.includes('?') ? '&' : '?') + query + hash;
        }
    } else if (payload && Object.getPrototypeOf(payload) === Object.prototype) {
        const headers = new Headers(init.headers);

        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        init.headers = headers;
        init.body = JSON.stringify(payload);
    } else {
        init.body = payload as BodyInit | null;
    }

    try {
        const response = await fetch(url, init);
        const empty = init.method === 'HEAD' || response.status === 204 || response.status === 205;
        const result: unknown = empty ? undefined : await response.json();

        if (!response.ok) {
            if (
                result &&
                typeof result === 'object' &&
                'status' in result &&
                result.status === 'error'
            ) {
                return result as ResponseError<E>;
            }

            const message =
                result && typeof result === 'object' && 'message' in result
                    ? String(result.message)
                    : '[' + response.status + '] ' + response.statusText;

            return { status: 'error', message };
        }

        if (
            result &&
            typeof result === 'object' &&
            'status' in result &&
            (result.status === 'success' || result.status === 'error')
        ) {
            return result as Response<S, E>;
        }

        return { status: 'success', result: result as S };
    } catch (error) {
        return { status: 'error', message: error instanceof Error ? error.message : String(error) };
    }
}

/**
 * Send a GET request using the shared JSON request helper.
 * @param resource Request URL.
 * @param payload Body or query parameters, depending on the HTTP method.
 * @param options Fetch options excluding the request body.
 * @returns A promise containing a success or error response.
 */
request.get = <S = unknown, E = unknown>(
    resource: Resource,
    payload: Payload = null,
    options: Omit<RequestInit, 'body'> = {},
): Promise<Response<S, E>> => request(resource, payload, { ...options, method: 'GET' });

/**
 * Send a HEAD request using the shared JSON request helper.
 * @param resource Request URL.
 * @param payload Body or query parameters, depending on the HTTP method.
 * @param options Fetch options excluding the request body.
 * @returns A promise containing a success or error response.
 */
request.head = <S = unknown, E = unknown>(
    resource: Resource,
    payload: Payload = null,
    options: Omit<RequestInit, 'body'> = {},
): Promise<Response<S, E>> => request(resource, payload, { ...options, method: 'HEAD' });

/**
 * Send a POST request using the shared JSON request helper.
 * @param resource Request URL.
 * @param payload Body or query parameters, depending on the HTTP method.
 * @param options Fetch options excluding the request body.
 * @returns A promise containing a success or error response.
 */
request.post = <S = unknown, E = unknown>(
    resource: Resource,
    payload: Payload = null,
    options: Omit<RequestInit, 'body'> = {},
): Promise<Response<S, E>> => request(resource, payload, { ...options, method: 'POST' });

/**
 * Send a PUT request using the shared JSON request helper.
 * @param resource Request URL.
 * @param payload Body or query parameters, depending on the HTTP method.
 * @param options Fetch options excluding the request body.
 * @returns A promise containing a success or error response.
 */
request.put = <S = unknown, E = unknown>(
    resource: Resource,
    payload: Payload = null,
    options: Omit<RequestInit, 'body'> = {},
): Promise<Response<S, E>> => request(resource, payload, { ...options, method: 'PUT' });

/**
 * Send a PATCH request using the shared JSON request helper.
 * @param resource Request URL.
 * @param payload Body or query parameters, depending on the HTTP method.
 * @param options Fetch options excluding the request body.
 * @returns A promise containing a success or error response.
 */
request.patch = <S = unknown, E = unknown>(
    resource: Resource,
    payload: Payload = null,
    options: Omit<RequestInit, 'body'> = {},
): Promise<Response<S, E>> => request(resource, payload, { ...options, method: 'PATCH' });

/**
 * Send a DELETE request using the shared JSON request helper.
 * @param resource Request URL.
 * @param payload Body or query parameters, depending on the HTTP method.
 * @param options Fetch options excluding the request body.
 * @returns A promise containing a success or error response.
 */
request.delete = <S = unknown, E = unknown>(
    resource: Resource,
    payload: Payload = null,
    options: Omit<RequestInit, 'body'> = {},
): Promise<Response<S, E>> => request(resource, payload, { ...options, method: 'DELETE' });

// Export module
export { request };
export type { ResponseSuccess, ResponseError, Response, Resource, Payload };
