import { FormRegistrate, FormWrapper } from "../../components"
import Block from "../../core/Block"

export default class RegistratePage extends Block {
    constructor(props: any) {
        super({
            ...props,
            FormLogin: new FormWrapper({
                title: 'Sign up',
                classes: 'form__signup',
                formBody: new FormRegistrate({})
            }),
        })
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        console.log('Change Login page props');
        return true;
    }

    render() {
        return `
            <div class="container">
                {{{ FormLogin }}}
            </div>
        `
    }
}
