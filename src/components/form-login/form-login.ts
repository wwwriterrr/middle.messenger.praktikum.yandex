import Block from "../../core/Block"
import { Button } from "../button"
import { Input } from "../input"


export default class FormLogin extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onLoginBind = this.onLogin.bind(this);


        const InputLogin = new Input({label: 'Login', type: 'text', name: 'login', onBlur: onChangeLoginBind});
        const InputPassword = new Input({label: 'Password', type: 'password', name: 'password'});
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


    onChangeLogin(e) {
        const inputValue = e.target.value;

        //this.children.InputLogin.setProps({classes: 'test'});

        if(inputValue === 'error') {
            this.children.InputLogin.setProps({error: 'some error', value: inputValue});
            return;
        } else {
            this.children.InputLogin.setProps({error: null, value: inputValue});
        }

        this.setProps({login: inputValue});
    }

    onLogin() {
        console.log({login: this.props.login})
    }



    render() {
        return (`
            <div class="form__login-wrap">
                {{{ InputLogin }}}
                {{{ InputPassword }}}
                {{{ ButtonLogin }}}
                {{{ ButtonSignup }}}
            </div>
        `)
    }
}