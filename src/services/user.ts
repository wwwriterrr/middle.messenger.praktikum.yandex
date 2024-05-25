//@ts-nocheck

import UserApi from "../api/user";
import { apiUrl } from "../api/type";
import { checkResponse } from "./utils";


const userApi = new UserApi();

export const settings = async (model) => {
    window.store.set({isLoading: true});
    try{
        const response: any = await userApi.settings(model);

        await checkResponse(response);

        const responseData = await response.json();
        window.store.set({userData: responseData});

        return true;
    }catch (error) {
        if(error) window.store.set({userError: error.message});
        else window.store.set({userError: 'Fetch error'});

        return false;
    }finally {
        window.store.set({isLoading: false})
    }
}

export const changePassword = async (model: {oldPassword: string, newPassword: string}) => {
    window.store.set({isLoading: true});
    try{
        const response: any = await userApi.changePassword(model);

        await checkResponse(response);

        window.store.set({passwdSuccess: 'Password successfully changed'});
        setTimeout(() => {
            window.store.set({passwdSuccess: null});
        }, 3000);
        return true;
    }catch (error) {
        if(error) window.store.set({userError: error.message});
        else window.store.set({userError: 'Fetch error'});

        return false;
    }finally {
        window.store.set({isLoading: false})
    }
}

export const avatar = async (model: FormData) => {
    window.store.set({isLoading: true});
    try{
        const response = await userApi.avatar(model);

        await checkResponse(response);

        const responseData = await response.json();
        window.store.set({userData: responseData, userAvatar: `${apiUrl}/resources${responseData.avatar}`});

        return true;
    }catch (error) {
        if(error) window.store.set({avatarError: error.message});
        else window.store.set({avatarError: 'Fetch error'});

        return false;
    }finally {
        window.store.set({isLoading: false});
    }
}
