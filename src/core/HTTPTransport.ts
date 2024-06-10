//@ts-nocheck

export const HOST = 'https://ya-praktikum.tech/api/v2';

export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method: METHOD;
    data?: any;
    timeout?: number,
};

type HTTPMethod = <R=unknown>(url: string, options?: Options) => Promise<R>

function queryString(data: Record<string | number, string | number | undefined>) {
    return Object.entries(data)
        .filter((entry): entry is [ string, string | number ] => entry[1] != undefined)
        .map(([ name, value ]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
        .join('&');
}

export class HTTPTransport {
    private apiUrl: string = ''
    constructor(apiPath: string) {
        this.apiUrl = `${HOST}${apiPath}`;
    }

    async request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
        const {method, data} = options;

        // if(method === METHOD.GET && data && Object.keys(data).length) {
        //     const queryPart = queryString(data);
        //     if (queryPart) {
        //         url += '?' + queryPart;
        //     }
        // }

        let request_data: string | FormData = '';
        if(data instanceof FormData) request_data = data;
        else request_data = JSON.stringify(data);

        let response_headers: {'Content-Type'?: string} = { 'Content-Type': 'application/json' };
        if(data instanceof FormData) response_headers = {};

        let requestOptions = {
            method,
            credentials: 'include',
            mode: 'cors',
            headers: response_headers,
        }
        if(method !== METHOD.GET) requestOptions.body = request_data;

        const response = await fetch(url, requestOptions);

        if(!response.ok){
            await Promise.reject(`HTTPTransport Request Error`);
        }

        // const isJson = response.headers.get('content-type')?.includes('application/json');
        // const resultData = await isJson ? response.json() : null
        //
        // return resultData as unknown as TResponse;

        return response as unknown as TResponse;
    };

    get: HTTPMethod = (url: string, options: Options = { method: METHOD.GET }) => {
        const { data } = options;
        if(data && Object.keys(data).length) {
            const queryPart = queryString(data);
            if (queryPart) {
                url += '?' + queryPart;
            }
        }
        return this.request(`${this.apiUrl}${url}`, {...options, method: METHOD.GET})
    }

    put: HTTPMethod = (url: string, options: Options = { method: METHOD.GET }) => (
        this.request(`${this.apiUrl}${url}`, {...options, method: METHOD.PUT})
    )

    post: HTTPMethod = (url: string, options: Options = { method: METHOD.GET }) => (
        this.request(`${this.apiUrl}${url}`, {...options, method: METHOD.POST})
    )

    delete: HTTPMethod = (url: string, options: Options = { method: METHOD.GET }) => (
        this.request(`${this.apiUrl}${url}`, {...options, method: METHOD.DELETE})
    )
}
