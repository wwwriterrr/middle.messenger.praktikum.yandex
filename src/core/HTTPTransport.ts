//@ts-nocheck

const HOST = 'https://ya-praktikum.tech/api/v2';

enum METHOD {
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


export class HTTPTransport {
    private apiUrl: string = ''
    constructor(apiPath: string) {
        this.apiUrl = `${HOST}${apiPath}`;
    }

    async request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
        const {method, data} = options;

        let request_data: string | FormData = '';
        if(data instanceof FormData) request_data = data;
        else request_data = JSON.stringify(data);

        let response_headers: {'Content-Type'?: string} = { 'Content-Type': 'application/json' };
        if(data instanceof FormData) response_headers = {};

        const response = await fetch(url, {
            method,
            credentials: 'include',
            mode: 'cors',
            headers: response_headers,
            body: request_data,
        });
        if(!response.ok){
            await Promise.reject(`Error ${res.status}`);
        }

        // const isJson = response.headers.get('content-type')?.includes('application/json');
        // const resultData = await isJson ? response.json() : null
        //
        // return resultData as unknown as TResponse;

        return response as unknown as TResponse;
    };

    get: HTTPMethod = (url: string, options: Options = { method: METHOD.GET }) => (
        this.request(`${this.apiUrl}${url}`, {...options, method: METHOD.GET})
    )

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
