import { FormRegistrate, FormWrapper } from "../../components"
import Block from "../../core/Block"


interface IProps {
    FormLogin: Block<any>,
}

export default class RegistratePage extends Block<IProps> {
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
