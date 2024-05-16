import { HTTPTransport } from "../core/HTTPTransport";
import { UserDTO, APIError } from "./type";


const user_api: HTTPTransport = new HTTPTransport('/user');

// const delay = (showError) => new Promise((resolve, reject) => {
//     if(showError) {
//         setTimeout(() => reject(), 2000);
//     } else {
//         setTimeout(() => resolve(), 3000);
//     }
// })

export default class UserApi {
    async settings(data: UserDTO): Promise<void | APIError> {
        return user_api.put('/profile', { data });
        // return await delay(data.login === 'httperror');
    }

    async avatar(data: FormData): Promis<void | APIError> {
        return user_api.put('/profile/avatar', { data })
    }
}
