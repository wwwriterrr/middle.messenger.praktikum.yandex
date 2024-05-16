import ChatsApi from "../api/chat";


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
