//@ts-nocheck

import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import Router from './core/Router';
import { Store } from './core/Store';
import {is_authenticated} from "./services/auth.ts";


Handlebars.registerHelper('if_eq', function(a, b, opts) {
    const t: any = this
    if (a == b) {
        return opts.fn(t)
    } else {
        return opts.inverse(t)
    }
});

declare global {
    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

const router = new Router('#app');
window.router = router;

window.store = new Store({
    isLoading: false,
    loginError: null,
    user: null,
    userData: {},
    chats: [],
    selectedChat: {},
    showChatModal: false,
});

const is_auth = is_authenticated();
is_auth.then(() => {
    const { user } = window.store.getState();

    router
        .use('/login', Pages.LoginPage)
        .use('/sign-up', Pages.RegistratePage)
        .use('/settings', Pages.ProfilePage)
        .use('/messenger', Pages.ChatPage)
        .use('/remember-password', Pages.RememberPassword)
        .use('/remember-password-auth', Pages.RememberPassword)
        .use('*', Pages.ErrorPage)
        .start();

    if(window.location.pathname === '/'){
        if(user) router.go('/messenger');
        else router.go('/login');
    }

    if(window.location.pathname === '/messenger' || window.location.pathname === '/settings'){
        if(!user) router.go('/login');
    }

    if(window.location.pathname === '/login' || window.location.pathname === '/sign-up'){
        if(user) router.go('/messenger');
    }
})

// router
//     .use('/', Pages.LoginPage)
//     .use('/login', Pages.LoginPage)
//     .use('/sign-up', Pages.RegistratePage)
//     .use('/settings', Pages.ProfilePage)
//     .use('/messenger', Pages.ChatPage)
//     .use('/remember-password', Pages.RememberPassword)
//     .use('/remember-password-auth', Pages.RememberPassword)
//     .use('*', Pages.ErrorPage)
//     .start();