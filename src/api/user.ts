//@ts-nocheck

import { HTTPTransport } from "../core/HTTPTransport";
import { UserDTO, APIError } from "./type";


const userApi: HTTPTransport = new HTTPTransport('/user');

// const delay = (showError) => new Promise((resolve, reject) => {
//     if(showError) {
//         setTimeout(() => reject(), 2000);
//     } else {
//         setTimeout(() => resolve(), 3000);
//     }
// })

export default class UserApi {
    async settings(data: UserDTO): Promise<void | APIError> {
        return userApi.put('/profile', { data });
        // return await delay(data.login === 'httperror');
    }

    async changePassword(data: {oldPassword: string, newPassword: string}): Promise<void | APIError>{
        return userApi.put('/password', { data });
    }

    async avatar(data: FormData): Promise<void | APIError> {
        return userApi.put('/profile/avatar', { data })
    }
}
