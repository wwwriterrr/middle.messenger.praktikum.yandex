import Block from "../../core/Block"
import { Button } from "../button"
import { Input } from "../input"
import { login } from "../../services/auth";
import { connect } from "../../utils/connect";


interface IProps{
    error: string,
    InputLogin: Block<object>,
    InputPassword: Block<object>,
    ButtonRemember: Block<object>,
    ButtonLogin: Block<object>,
    ButtonSignup: Block<object>,
}

class FormLogin extends Block<IProps> {
    init() {
        const onChangeLoginBind = this.onInputBlur.bind(this);
        const onChangePasswordBind = this.onInputBlur.bind(this);
        const onLoginBind = this.onLogin.bind(this);

        const InputLogin = new Input({label: 'Login', type: 'text', name: 'login', value: '', error: null, classes: '', onBlur: onChangeLoginBind});
        const InputPassword = new Input({label: 'Password', type: 'password', name: 'password', value: '', error: null, classes: '', onBlur: onChangePasswordBind});
        const ButtonRemember = new Button({label: 'I don\'t remember the password', type: 'link', classes: 'button_nopasswd button_nofill button-greytext button_normweight', page: 'Remember password', onClick: () => { window.router.go('/remember-password'); }})
        const ButtonLogin = new Button({label: 'Sign In', type: 'primary', mode: 'action', onClick: onLoginBind});
        const ButtonSignup = new Button({label: 'Sign Up', type: 'link', page: 'registrate', onClick: () => { window.router.go('/sign-up'); }});

        this.children = {
            ...this.children,
            InputLogin,
            InputPassword,
            ButtonRemember,
            ButtonLogin,
            ButtonSignup
        }
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

        if(InputLogin.props.error || InputPassword.props.error) return;

        console.log('Submit', {login: loginValue, password: passwdValue});
        // btn.setProps({isLoading: true});
        // setTimeout(() => { btn.setProps({isLoading: null}); }, 3000);
        login({login: loginValue, password: passwdValue});
    }



    render() {
        return (`
            <div class="form__login-wrap{{#if loginError}} form__login-wrap_error{{/if}}">
                {{#if isLoading}}
                    <div>Loading...</div>
                {{else}}
                    {{#if loginError}}
                        <div class="form__error">{{ loginError }}</div>
                    {{/if}}
                    {{{ InputLogin }}}
                    {{{ InputPassword }}}
                    {{{ ButtonRemember }}}
                    {{{ ButtonLogin }}}
                    {{{ ButtonSignup }}}
                {{/if}}
            </div>
        `)
    }
}

const mapStateToPropsShort = ({loginField, isLoading, loginError}) => ({loginField, isLoading, loginError})

export default connect(mapStateToPropsShort)(FormLogin)
