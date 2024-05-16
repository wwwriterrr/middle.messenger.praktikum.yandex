import { HTTPTransport } from "../core/HTTPTransport";
import { APIError } from "./type";


const chats_api: HTTPTransport = new HTTPTransport('/chats');

export default class ChatsApi {
    async get_chats(): Promise<void | APIError> {
        return chats_api.get('/', );
        // return await delay(data.login === 'httperror');
    }
}

