import Block from "../../core/Block"
import { Button } from "../button"
import { Input } from "../input"
import isEqual from 'lodash/isEqual';


export default class FormRegistrate extends Block {
    init() {
        const onSignupBind = this.onSignup.bind(this);
        const onChangeFieldBind = this.onInputBlur.bind(this);

        const InputLogin = new Input({label: 'Login', type: 'text', name: 'login', value: '', error: null, classes: '', onBlur: onChangeFieldBind});
        const InputEmail = new Input({label: 'Email', type: 'text', name: 'email', value: '', error: null, classes: '', onBlur: onChangeFieldBind});
        const InputPhone = new Input({label: 'Phone number', type: 'text', name: 'phone', value: '', error: null, classes: '', onBlur: onChangeFieldBind});
        const InputFName = new Input({label: 'First name', type: 'text', name: 'first_name', value: '', error: null, classes: '', onBlur: onChangeFieldBind});
        const InputLName = new Input({label: 'Last name', type: 'text', name: 'second_name', value: '', error: null, classes: '', onBlur: onChangeFieldBind});
        const InputPassword = new Input({label: 'Password', type: 'password', name: 'password', value: '', error: null, classes: '', onBlur: onChangeFieldBind});
        const InputRPassword = new Input({label: 'Retype password', type: 'password', name: 'retype-password', value: '', error: null, classes: '', onBlur: onChangeFieldBind});
        const ButtonSignup = new Button({label: 'Sign Up', type: 'primary', mode: 'action', onClick: onSignupBind});
        const ButtonSignin = new Button({label: 'Sign In', type: 'link', page: 'login'});

        this.children = {
            ...this.children,
            InputLogin,
            InputEmail,
            InputPhone,
            InputFName,
            InputLName,
            InputPassword,
            InputRPassword,
            ButtonSignup,
            ButtonSignin
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Form Login props');
        return true;
    }

    onSignup() {
        return;
    }

    render() {
        return (`
            <div class="form__signup-wrap {{#if error}}form__signup-wrap_error{{/if}}">
                {{{ InputLogin }}}
                {{{ InputEmail }}}
                {{{ InputPhone }}}
                {{{ InputFName }}}
                {{{ InputLName }}}
                {{{ InputPassword }}}
                {{{ InputRPassword }}}
                {{{ ButtonSignup }}}
                {{{ ButtonSignin }}}
            </div>
        `)
    }
}