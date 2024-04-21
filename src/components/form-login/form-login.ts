import Block from "../../core/Block"
import { Button } from "../button"
import { Input } from "../input"
import isEqual from 'lodash/isEqual';


export default class FormLogin extends Block {
    init() {
        const onChangeLoginBind = this.onInputBlur.bind(this);
        const onChangePasswordBind = this.onInputBlur.bind(this);
        const onLoginBind = this.onLogin.bind(this);

        //{{> Button label="I don't remember the password" type="link" classes="button_nopasswd button_nofill button-greytext button_normweight" page="Remember password" }}

        const InputLogin = new Input({label: 'Login', type: 'text', name: 'login', value: '', error: null, classes: '', onBlur: onChangeLoginBind});
        const InputPassword = new Input({label: 'Password', type: 'password', name: 'password', value: '', error: null, classes: '', onBlur: onChangePasswordBind});
        const ButtonRemember = new Button({label: 'I don\'t remember the password', type: 'link', classes: 'button_nopasswd button_nofill button-greytext button_normweight', page: 'Remember password'})
        const ButtonLogin = new Button({label: 'Sign In', type: 'primary', mode: 'action', onClick: onLoginBind});
        const ButtonSignup = new Button({label: 'Sign Up', type: 'link', page: 'registrate'});

        this.children = {
            ...this.children,
            InputLogin,
            InputPassword,
            ButtonRemember,
            ButtonLogin,
            ButtonSignup
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Form Login props');
        return true;
    }

    onLogin() {
        const btn = this.children.ButtonLogin;
        if(btn.props.isLoading) return;

        const {InputLogin, InputPassword} = this.children;
        const loginValue = InputLogin.props.value;
        const passwdValue = InputPassword.props.value;
        const errors = [];

        if(!loginValue){
            errors.push([InputLogin, 'Login is required field'])
        }
        if(!passwdValue){
            errors.push([InputPassword, 'Password is required field'])
        }

        if(errors.length !== 0){
            errors.map((item) => {
                item[0].setProps({error: item[1]});
            })
            return;
        }

        console.log('Submit', {login: loginValue, password: passwdValue});
        btn.setProps({isLoading: true});
        setTimeout(() => { btn.setProps({isLoading: null}); }, 3000);
    }



    render() {
        return (`
            <div class="form__login-wrap {{#if error}}form__login-wrap_error{{/if}}">
                {{{ InputLogin }}}
                {{{ InputPassword }}}
                {{{ ButtonRemember }}}
                {{{ ButtonLogin }}}
                {{{ ButtonSignup }}}
            </div>
        `)
    }
}