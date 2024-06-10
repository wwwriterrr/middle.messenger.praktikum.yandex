//@ts-nocheck

import { FormLogin, FormWrapper } from "../../components"
import Block from "../../core/Block"


interface IProps{
    FormLogin: Block<{ title: string, classes: string, formBody: Block<object> }>
}

export default class LoginPage extends Block<IProps> {
    constructor(props: any) {
        super({
            ...props,
            FormLogin: new FormWrapper({
                title: 'Sign in',
                classes: 'form__login',
                formBody: new FormLogin({})
            }),
            //inputComponentKeys: Object.keys(inputComponents),
            //...inputComponents
        })
    }

    render(): string {
        return `
            <div class="container">
                {{{ FormLogin }}}
            </div>
        `
    }
}
