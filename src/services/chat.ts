//@ts-nocheck

import ChatsApi from "../api/chat";
import { CreateChat } from "../api/type";


const chatsApi = new ChatsApi();

export const getChats = async () => {
    window.store.set({chatsLoading: true});
    try{
        const response: any = await chatsApi.get_chats();

        if(response.status !== 200){
            const responseData = await response.json();
            if('reason' in responseData) throw new Error(`Request error: ${responseData.reason}`);
            else throw new Error(`Fetch error. Already fix it.`);
        }

        const responseData = await response.json();
        window.store.set({chats: responseData});
    }catch (error) {
        if(error) window.store.set({chatsError: error.message});
        else window.store.set({chatsError: 'Chats fetch error'});
    }finally {
        window.store.set({chatsLoading: false});
    }
}

export const addChat = async (model: CreateChat) => {
    window.store.set({addChatLoading: true});
    try{
        const response: any = await chatsApi.add_chat(model);

        if(response.status !== 200){
            const responseData = await response.json();
            if('reason' in responseData) throw new Error(`Request error: ${responseData.reason}`);
            else throw new Error(`Fetch error. Already fix it.`);
        }

        const responseData = await response.json();

        return responseData;
    }catch (error) {
        if(error) window.store.set({addChatError: error.message});
        else window.store.set({addChatError: 'Chats fetch error'});
        return null;
    }finally {
        window.store.set({addChatLoading: false});
    }
}

export const setAvatar = async (model: FormData) => {
    window.store.set({settingsChatLoading: true});
    try{
        const response: any = await chatsApi.set_avatar(model);

        if(response.status !== 200){
            const responseData = await response.json();
            if('reason' in responseData) throw new Error(`Request error: ${responseData.reason}`);
            else throw new Error(`Fetch error. Already fix it.`);
        }

        const responseData = await response.json();

        return responseData;
    }catch (error) {
        if(error) window.store.set({settingsChatError: error.message});
        else window.store.set({settingsChatError: 'Chats fetch error'});
        return null;
    }finally {
        window.store.set({settingsChatLoading: false});
    }
}

export const getUsers = async (model: {chat_id: number}) => {
    window.store.set({usersLoading: true});
    try{
        const response: any = await chatsApi.get_users(model);

        if(response.status !== 200){
            const responseData = await response.json();
            if('reason' in responseData) throw new Error(`Request error: ${responseData.reason}`);
            else throw new Error(`Fetch error. Already fix it.`);
        }

        const responseData = await response.json();
        window.store.set({users: responseData});
    }catch (error) {
        if(error) window.store.set({usersError: error.message});
        else window.store.set({usersError: 'Chats fetch error'});
    }finally {
        window.store.set({usersLoading: false});
    }
}

export const addUsers = async (model: {users: number[], chatId: number}) => {
    window.store.set({addUserLoading: true});
    try{
        const response: any = await chatsApi.add_users(model);

        if(response.status !== 200){
            const responseData = await response.json();
            if('reason' in responseData) throw new Error(`Request error: ${responseData.reason}`);
            else throw new Error(`Fetch error. Already fix it.`);
        }

        //const responseData = await response.json();
        window.store.set({addUserSuccess: 'Users successfully added'});
        await getUsers({chat_id: model.chatId});
    }catch (error) {
        if(error) window.store.set({addUserError: error.message});
        else window.store.set({addUserError: 'Chats fetch error'});
    }finally {
        window.store.set({addUserLoading: false});
    }
}
