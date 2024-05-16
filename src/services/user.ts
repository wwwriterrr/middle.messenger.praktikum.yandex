import UserApi from "../api/user";


const userApi = new UserApi();

export const settings = async (model) => {
    window.store.set({isLoading: true});
    try{
        const response: any = await userApi.settings(model);
        if(response.status !== 200){
            const responseData = await response.json();
            if('reason' in responseData) throw new Error(`Request error: ${responseData.reason}`);
            else throw new Error(`Fetch error. Already fix it.`);
        }

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

export const avatar = async (model: FormData) => {
    window.store.set({isLoading: true});
    try{
        const response = await userApi.avatar(model);
        if(response.status !== 200){
            const responseData = await response.json();
            if('reason' in responseData) throw new Error(`Request error: ${responseData.reason}`);
            else throw new Error(`Fetch error. Already fix it.`);
        }

        const responseData = await response.json();
        window.store.set({userData: responseData, userAvatar: `https://ya-praktikum.tech/api/v2/resources${responseData.avatar}`});

        return true;
    }catch (error) {
        if(error) window.store.set({avatarError: error.message});
        else window.store.set({avatarError: 'Fetch error'});

        return false;
    }finally {
        window.store.set({isLoading: false});
    }
}
