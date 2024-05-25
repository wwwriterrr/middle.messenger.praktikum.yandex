//@ts-nocheck

import { HTTPTransport } from "../core/HTTPTransport";
import { APIError, CreateChat } from "./type";


const chatsApi: HTTPTransport = new HTTPTransport('/chats');

export default class ChatsApi {
    async getChats(): Promise<void | APIError> {
        return chatsApi.get('/', );
        // return await delay(data.login === 'httperror');
    }

    async getUsers(data: { chat_id: number }): Promise<void | APIError>{
        return chatsApi.get(`/${data.chat_id}/users`);
    }

    async addUsers(data: {users: number[], chatId: number}){
        return chatsApi.put('/users', {data})
    }

    async deleteUsers(data: {users: number[], chatId: number}){
        return chatsApi.delete('/users', {data})
    }

    async addChat(data: CreateChat): Promise<void | APIError> {
        return chatsApi.post('/', { data });
    }

    async deleteChat(data: {chatId: number}): Promise<void | APIError> {
        return chatsApi.delete('/', { data });
    }

    async setAvatar(data: FormData): Promise<void | APIError> {
        return chatsApi.put('/avatar', { data })
    }

    async getToken(data: { chat_id: number }): Promise<void | APIError>{
        return chatsApi.post(`/token/${data.chat_id}`);
    }
}

