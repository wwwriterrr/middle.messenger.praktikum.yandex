import Block from "../../core/Block"
import { Button } from "../button"
import ProfileRow from "../profile_row/profile_row";
import isEqual from 'lodash/isEqual';


export default class FormLogin extends Block {
    init() {
        const onChangeInputBind = this.onChangeInput.bind(this);

        const InputEmail = new ProfileRow({label: 'Email', type: 'text', name: 'email', value: 'mail@example.com', error: null, onBlur: onChangeInputBind});
        const InputLogin = new ProfileRow({label: 'Login', type: 'text', name: 'login', value: 'johny', error: null, onBlur: onChangeInputBind});
        const InputFName = new ProfileRow({label: 'First name', type: 'text', name: 'first_name', value: 'John', error: null, onBlur: onChangeInputBind});
        const InputLName = new ProfileRow({label: 'Last name', type: 'text', name: 'second_name', value: 'Doe', error: null, onBlur: onChangeInputBind});
        const InputNName = new ProfileRow({label: 'Nickname', type: 'text', name: 'display_name', value: 'Rocker', error: null, onBlur: onChangeInputBind});
        const InputPhone = new ProfileRow({label: 'Phone number', type: 'text', name: 'phone', value: '+7 999 345 67 89', error: null, onBlur: onChangeInputBind});
        const ButtonSave = new Button({label: 'Save', type: 'primary', mode: 'action', /*onClick: onLoginBind*/});
        const ButtonChangePasswd = new Button({label: 'Change password', classes: 'button_nofill', type: 'link', page: 'Change Password'});
        const ButtonLogout = new Button({label: 'Log out', classes: 'button_nofill button_red', type: 'link', page: 'Nav'});

        this.children = {
            ...this.children,
            InputEmail,
            InputLogin,
            InputFName,
            InputLName,
            InputNName,
            InputPhone,
            ButtonSave,
            ButtonChangePasswd,
            ButtonLogout
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Form Profile props');
        return true;
    }

    onChangeInput(){
        console.log('change input');
    }

    render() {
        return (`
            <form class="form form__profile profile__rows">
                {{{ InputEmail }}}
                {{{ InputLogin }}}
                {{{ InputFName }}}
                {{{ InputLName }}}
                {{{ InputNName }}}
                {{{ InputPhone }}}
                <div class="profile__manage">
                    {{{ ButtonSave }}}
                    {{{ ButtonChangePasswd }}}
                    {{{ ButtonLogout }}}
                </div>
            </form>
        `)
    }
}