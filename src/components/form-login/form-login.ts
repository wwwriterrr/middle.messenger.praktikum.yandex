import Block from "../../core/Block"
import { Button } from "../button"
import { Input } from "../input"
import Validator from "../../utils/validator";
import isEqual from 'lodash/isEqual';


export default class FormLogin extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onLoginBind = this.onLogin.bind(this);


        const InputLogin = new Input({label: 'Login', type: 'text', name: 'login', value: '', error: null, classes: '', onBlur: onChangeLoginBind});
        const InputPassword = new Input({label: 'Password', type: 'password', name: 'password', value: '', error: null, classes: '', onBlur: onChangePasswordBind});
        const ButtonLogin = new Button({label: 'Sign In', type: 'primary', mode: 'action', onClick: onLoginBind});
        const ButtonSignup = new Button({label: 'Sign Up', type: 'link', page: 'registrate'});

        this.children = {
            ...this.children,
            InputLogin,
            InputPassword,
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

    onChangeLogin(e) {
        const inputValue = e.target.value;
        const element = this.children.InputLogin;

        const props = {value: inputValue, error: null};

        if( inputValue !== '' ) props.classes = 'input__element_filled';
        else{
            props.classes = '';
            element.setProps(props);
            return;
        }

        try{
            Validator(inputValue);
        } catch (error) {
            props.error = error.message;
            element.setProps(props);
            return;
        }

        element.setProps(props);
    }

    onChangePassword(e) {
        const inputValue = e.target.value;
        const element = this.children.InputPassword;

        if( inputValue !== '' ) element.setProps({classes: 'input__element_filled'})
        else element.setProps({classes: ''})

        element.setProps({error: null, value: inputValue});
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
            //loginElement.setProps({error: 'Login is required field'});
            //return;
        }
        if(!passwdValue){
            errors.push([InputPassword, 'Password is required field'])
            //passwdElement.setProps({error: 'Password is required field'});
            //return;
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
                {{{ ButtonLogin }}}
                {{{ ButtonSignup }}}
            </div>
        `)
    }
}