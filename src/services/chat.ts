//@ts-nocheck

import ChatsApi from "../api/chat";
import { CreateChat } from "../api/type";
import { checkResponse } from "./utils";


const chatsApi = new ChatsApi();

export const getChats = async () => {
    window.store.set({chatsLoading: true});
    try{
        const response: any = await chatsApi.getChats();

        await checkResponse(response);

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
        const response: any = await chatsApi.addChat(model);

        await checkResponse(response);

        const responseData = await response.json();

        // const { chats } = window.store.getState();
        // const new_chats = [...chats, [responseData]];
        // window.store.set({chats: new_chats});
        getChats();

        return responseData;
    }catch (error) {
        if(error) window.store.set({addChatError: error.message});
        else window.store.set({addChatError: 'Chats fetch error'});
        return null;
    }finally {
        window.store.set({addChatLoading: false});
    }
}

export const deleteChat = async (model: {chatId: number}) => {
    window.store.set({settingsChatLoading: true});
    try{
        const response: any = await chatsApi.deleteChat(model);

        await checkResponse(response);

        const { selectedChat, chats } = window.store.getState();
        const new_chats = chats.filter(chat => chat.id !== selectedChat.id);

        window.store.set({showChatModal: false, selectedChat: {}, chats: new_chats});

        return true;
    }catch (error) {
        if(error) window.store.set({settingsChatError: error.message});
        else window.store.set({settingsChatError: 'Chats fetch error'});
        return false;
    }finally {
        window.store.set({settingsChatLoading: false});
    }
}

export const setAvatar = async (model: FormData) => {
    window.store.set({settingsChatLoading: true});
    try{
        const response: any = await chatsApi.setAvatar(model);

        await checkResponse(response);

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
        const response: any = await chatsApi.getUsers(model);

        await checkResponse(response);

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
        const response: any = await chatsApi.addUsers(model);

        await checkResponse(response);

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

export const deleteUsers = async (model: {users: number[], chatId: number}) => {
    window.store.set({deleteUserLoading: true});
    try{
        const response: any = await chatsApi.deleteUsers(model);

        await checkResponse(response);

    }catch (error) {
        if(error) window.store.set({deleteUserError: error.message});
        else window.store.set({deleteUserError: 'Chats fetch error'});
    }finally {
        window.store.set({deleteUserLoading: false});
    }
}

export const getToken = async (model: {chat_id: number}) => {
    window.store.set({tokenLoading: true});
    try{
        const response: any = await chatsApi.getToken(model);

        await checkResponse(response);

        const data = await response.json();
        const { token } = data;
        return token;
    }catch (error) {
        if(error) window.store.set({tokenError: error.message});
        else window.store.set({tokenError: 'Chats fetch error'});

        return null;
    }finally {
        window.store.set({tokenLoading: false});
    }
}
