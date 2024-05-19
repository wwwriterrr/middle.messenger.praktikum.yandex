//@ts-nocheck

import { HTTPTransport } from "../core/HTTPTransport";
import { APIError, CreateChat } from "./type";


const chats_api: HTTPTransport = new HTTPTransport('/chats');

export default class ChatsApi {
    async get_chats(): Promise<void | APIError> {
        return chats_api.get('/', );
        // return await delay(data.login === 'httperror');
    }

    async get_users(data: { chat_id: number }): Promise<void | APIError>{
        return chats_api.get(`/${data.chat_id}/users`);
    }

    async add_users(data: {users: number[], chatId: number}){
        return chats_api.put('/users', {data})
    }

    async delete_users(data: {users: number[], chatId: number}){
        return chats_api.delete('/users', {data})
    }

    async add_chat(data: CreateChat): Promise<void | APIError> {
        return chats_api.post('/', { data });
    }

    async delete_chat(data: {chatId: number}): Promise<void | APIError> {
        return chats_api.delete('/', { data });
    }

    async set_avatar(data: FormData): Promise<void | APIError> {
        return chats_api.put('/avatar', { data })
    }
}

