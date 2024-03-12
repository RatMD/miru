
export interface ResponseSuccess<T = any> {
    status: 'success';
    result: T;
}

export interface ResponseError<T = any> {
    status: 'error';
    message: string;
    details?: T;
}

export type Response<T = any> = ResponseSuccess<T> | ResponseError<T>;

export type Resource = string | URL;
export type PayloadObject = { [key: string]: string };
export type Payload = ArrayBuffer | Blob | DataView | FormData | PayloadObject | ReadableStream | URLSearchParams;

/**
 * Request Handler
 * @param resource 
 * @param payload 
 * @param options 
 * @returns 
 */
async function request(resource: Resource, payload: Payload, options: Omit<RequestInit, 'body'> = {}): Promise<Response> {
    if (typeof options.method == 'undefined') {
        options.method = 'POST';
    }
    if (options.method != 'GET' && options.method != 'HEAD') {
        (options as RequestInit).body = (payload as any);
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
                result: response
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

// Export Module
export default request;
export { request };
