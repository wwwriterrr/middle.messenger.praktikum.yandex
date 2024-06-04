//@ts-nocheck

import { expect } from "chai";
// import sinon from 'sinon';
import Router from "./Router";
import * as Pages from "../pages";


describe('Router', () => {

    let router: Router;

    before(() => {
        router = new Router({});
        router
            .use('/', Pages.LoginPage)
            .use('/sign-up', Pages.RegistratePage)
    })

    it('Проверка добавления путей в роутер', () => {
        const expectedLength = 2;

        expect(router.routes?.length).to.be.eq(expectedLength);
    })
})
