import { FormRegistrate, FormWrapper } from "../../components"
import Block from "../../core/Block"


interface IProps {
    FormLogin: Block<{ title: string, classes: string, formBody: Block<object> }>,
}

export default class RegistratePage extends Block<IProps> {
    constructor(props: IProps) {
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
