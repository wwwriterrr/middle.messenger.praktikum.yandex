import { FormLogin, FormWrapper } from "../../components"
import Block from "../../core/Block"


interface IProps{
    FormLogin: Block<object>
}

export default class LoginPage extends Block<IProps> {
    constructor(props: any) {
        /*const inputComponents = props.inputs.reduce((acc, data) => {
            const component = new Input({label: data});
            acc[component._id] = component;
            return acc;
        }, {});*/


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

    render() {
        return `
            <div class="container">
                {{{ FormLogin }}}
            </div>
        `
    }
}
