import { FormLogin, FormWrapper } from "../../components"
import Block from "../../core/Block"
import isEqual from 'lodash/isEqual';


export default class LoginPage extends Block {
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

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)){
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
