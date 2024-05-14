//@ts-nocheck

import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import Router from './core/Router';
import { Store } from './core/Store';


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
    cats: [],
    user: null,
    selectedCard: null
});


router
    .use('/', Pages.LoginPage)
    .use('/login', Pages.LoginPage)
    .use('/sign-up', Pages.RegistratePage)
    .use('/settings', Pages.ProfilePage)
    .use('/messenger', Pages.ChatPage)
    .use('/remember-password', Pages.RememberPassword)
    .use('/remember-password-auth', Pages.RememberPassword)
    .use('*', Pages.ErrorPage)
    .start();