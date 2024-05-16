import AuthApi from "../api/auth";


const authApi = new AuthApi();

export const login = async (model) => {
    window.store.set({isLoading: true});
    try {
        // const logout = await authApi.logout();

        const response: any = await authApi.login(model);
        if(response.status !== 200){
            if(response.status === 400 || response.status === 401){
                const responseData = await response.json();
                throw new Error(`Fetch error: ${responseData.reason}`);
            }
            else throw new Error('Fetch error');
        }

        // Set user info to store
        // window.store.set({user: {id: 'test'}});

        // Chat redirect
        window.router.go('/messenger');

    } catch (error) {
        if(error) window.store.set({loginError: error.message});
        else window.store.set({loginError: 'Fetching error'});
    } finally {
        window.store.set({isLoading: false});
    }

}

export const signup = async (model) => {
    window.store.set({isLoading: true});
    try{
        const response: any = await authApi.create(model);

        if(response.status !== 200){
            if(response.status === 400){
                const responseData = await response.json();
                throw new Error(`Signup error: ${responseData.reason}`);
            }
            else throw new Error('Fetch error. Already fix it.');
        }

        // Set user info to store
        const responseData: any = await response.json();
        window.store.set({user: responseData.id});

        window.router.go('/messenger');
    } catch (error){
        if(error) window.store.set({signupError: error.message});
        else window.store.set({signupError: 'Fetching error'});
    } finally {
        window.store.set({isLoading: false});
    }
}

export const is_authenticated = async () => {
    try{
        const response: any = await authApi.me();
        if(response.status !== 200){
            const responseData = await response.json();
            if('reason' in responseData) throw new Error(`Request error: ${responseData.reason}`);
            else throw new Error('Fetch error. Already fix it.');
        }

        const responseData: any = await response.json();
        window.store.set({user: responseData.id});
        window.store.set({userData: responseData});

        return true;
    } catch (error) {
        console.log(error);
        return false;
    } finally {

    }
}

export const logout = async () => {
    const response: any = await authApi.logout();
    return response
}
