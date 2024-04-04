
export interface ResponseSuccess<S> {
    status: 'success';
    result: S;
}

export interface ResponseError<E> {
    status: 'error';
    message: string;
    details?: E;
}

export type Response<S, E> = ResponseSuccess<S> 
                           | ResponseError<E>;

export type Resource = string | URL;
export type Payload = ArrayBuffer 
                    | Blob 
                    | DataView 
                    | FormData 
                    | ReadableStream 
                    | URLSearchParams 
                    | { [key: string]: string }
                    | null;

/**
 * Request Handler
 * @param resource 
 * @param payload 
 * @param options 
 * @returns 
 */
async function request<S = any, E = any>(
    resource: Resource, 
    payload: Payload = null, 
    options: Omit<RequestInit, 'body'> = {}
): Promise<Response<S, E>> {
    if (typeof options.method == 'undefined') {
        options.method = 'POST';
    }

    if (options.method != 'GET' && options.method != 'HEAD') {
        (options as RequestInit).body = (payload as any);
    } else {
        const params = new URLSearchParams(payload as any);

        let resourceAsUrl = false;
        if (resource instanceof URL) {
            resource = resource.toString();
            resourceAsUrl = true;
        }

        resource = (resource.indexOf('?') >= 0 ? `&` : `?`) + `${params.toString()}`;
        if (resourceAsUrl) {
            resource = new URL(resource);
        }
    }

    try {
        const response = await fetch(resource, options);
        const result = await response.json();

        if (!response.ok) {
            if (result.status == 'error') {
                return result;
            } else {
                throw new Error(result.message || `[${response.status}] ${response.statusText}`);
            }
        }

        if (typeof result.status == 'undefined' && typeof result.result == 'undefined') {
            return {
                status: 'success',
                result
            }
        } else {
            return result;
        }
    } catch (err) {
        return {
            status: 'error',
            message: err instanceof Error ? err.message : (err as any).toString()
        };
    }
}

/**
 * GET Handler
 * @param resource 
 * @param payload 
 * @param options 
 * @returns 
 */
request.get = <S = any, E = any>(
    resource: Resource, 
    payload: Payload = {}, 
    options: Omit<RequestInit, 'body'> = {}
): Promise<Response<S, E>> => {
    options.method = 'GET';
    return request(resource, payload, options);
};

/**
 * HEAD Handler
 * @param resource 
 * @param payload 
 * @param options 
 * @returns 
 */
request.head = <S = any, E = any>(
    resource: Resource, 
    payload: Payload = {}, 
    options: Omit<RequestInit, 'body'> = {}
): Promise<Response<S, E>> => {
    options.method = 'HEAD';
    return request(resource, payload, options);
};

/**
 * PATCH Handler
 * @param resource 
 * @param payload 
 * @param options 
 * @returns 
 */
request.patch = <S = any, E = any>(
    resource: Resource, 
    payload: Payload = {}, 
    options: Omit<RequestInit, 'body'> = {}
): Promise<Response<S, E>> => {
    options.method = 'PATCH';
    return request(resource, payload, options);
};

/**
 * POST Handler
 * @param resource 
 * @param payload 
 * @param options 
 * @returns 
 */
request.post = <S = any, E = any>(
    resource: Resource, 
    payload: Payload = {}, 
    options: Omit<RequestInit, 'body'> = {}
): Promise<Response<S, E>> => {
    options.method = 'POST';
    return request(resource, payload, options);
};

/**
 * PUT Handler
 * @param resource 
 * @param payload 
 * @param options 
 * @returns 
 */
request.put = <S = any, E = any>(
    resource: Resource, 
    payload: Payload = {}, 
    options: Omit<RequestInit, 'body'> = {}
): Promise<Response<S, E>> => {
    options.method = 'PUT';
    return request(resource, payload, options);
};

/**
 * DELETE Handler
 * @param resource 
 * @param payload 
 * @param options 
 * @returns 
 */
request.delete = <S = any, E = any>(
    resource: Resource, 
    payload: Payload = {}, 
    options: Omit<RequestInit, 'body'> = {}
): Promise<Response<S, E>> => {
    options.method = 'DELETE';
    return request(resource, payload, options);
};

// Export Module
export default request;
export { request };
