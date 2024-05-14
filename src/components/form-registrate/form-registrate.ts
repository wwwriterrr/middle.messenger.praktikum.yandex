import Block from "../../core/Block"
import { Button } from "../button"
import { Input } from "../input"
import isEqual from 'lodash/isEqual';


interface IProps {
    error: string,
}

export default class FormRegistrate extends Block<IProps> {
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
        const ButtonSignin = new Button({label: 'Sign In', type: 'link', page: 'login', onClick: () => { window.router.go('/login'); }});

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
        const {InputPassword, InputRPassword} = this.children;
        const errors: any = [];
        const res: any = {};

        Object.keys(this.children).map((key) => {
            const item = this.children[key];
            if(item.props.name){
                console.log(item.props.error);
                if(!item.props.value){
                    errors.push([item, `The field cannot be empty`]);
                }
                if(item.props.error) throw new Error(item.props.error);
                res[item.props.name] = item.props.value;
            }
        })

        if(errors.length !== 0){
            errors.map((err: [Block<object>, string]) => {
                err[0].setProps({error: err[1]});
            })
            return;
        }

        if(InputPassword.props.value !== InputRPassword.props.value){
            InputPassword.setProps({error: 'The values are not equal'});
            InputRPassword.setProps({error: 'The values are not equal'});
            return;
        }

        console.log('submit', res);

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
