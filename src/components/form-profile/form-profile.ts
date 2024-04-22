//@ts-nocheck

import Block from "../../core/Block"
import { Button } from "../button"
import ProfileRow from "../profile_row/profile_row";
import ModalWrap from "../modal-wrap/modal-wrap";
import ModalPassword from "../modal-password/modal-password";
import isEqual from 'lodash/isEqual';
import Validator from "../../utils/validator";


export default class FormLogin extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                submit: (e) => { e.preventDefault();e.stopImmediatePropagation(); }
            },
            Modal: new ModalWrap({
                modalVisible: false,
                modalTitle: 'Change avatar',
                modalContent: new ModalPassword({}),
            }),
            changed: true,
        });
    }

    init() {
        const onChangeInputBind = this.onInputBlur.bind(this);
        const onSaveProfileBind = this.onSaveProfile.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        //const onChangeFieldBind = this.onChangeField.bind(this);

        const InputEmail = new ProfileRow({label: 'Email', type: 'text', name: 'email', value: 'mail@example.com',
            oldValue: 'mail@example.com', error: null, onBlur: onChangeInputBind});
        const InputLogin = new ProfileRow({label: 'Login', type: 'text', name: 'login', value: 'johny',
            oldValue: 'johny', error: null, onBlur: onChangeInputBind});
        const InputFName = new ProfileRow({label: 'First name', type: 'text', name: 'first_name', value: 'John',
            oldValue: 'John', error: null, onBlur: onChangeInputBind});
        const InputLName = new ProfileRow({label: 'Last name', type: 'text', name: 'second_name', value: 'Doe',
            oldValue: 'Doe', error: null, onBlur: onChangeInputBind});
        const InputNName = new ProfileRow({label: 'Nickname', type: 'text', name: 'display_name', value: 'Rocker',
            oldValue: 'Rocker', error: null, onBlur: onChangeInputBind});
        const InputPhone = new ProfileRow({label: 'Phone number', type: 'text', name: 'phone', value: '+79993456789',
            oldValue: '+79993456789', error: null, onBlur: onChangeInputBind});
        const ButtonSave = new Button({label: 'Save', type: 'primary', mode: 'action', onClick: onSaveProfileBind});
        const ButtonChangePasswd = new Button({label: 'Change password', classes: 'button_nofill', onClick: onChangePasswordBind});
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

    onChangeField(e){
        Object.keys(this.children).map(key => {
            const element = this.children[key];
            if(element.props.oldValue && element.props.oldValue !== element.props.value){
                this.setProps({changed: true})
            }
        })
    }

    onChangePassword(){
        this.children.Modal.setProps({modalVisible: true,});
    }

    onSaveProfile(){
        const res = {};
        const errors = [];

        Object.keys(this.children).map(key => {
            const element = this.children[key];
            if(element.props.name){
                try{
                    Validator(element.props.value, name=element.props.name);
                    res[element.props.name] = element.props.value;
                }catch (err){
                    errors.push([element, err.message]);
                    element.setProps({error: err.message});
                }
            }
        })

        if(errors.length !== 0){
            return;
        }

        console.log('Save profile', res);
    }

    render() {
        return (`
            <form class="form form__profile profile__rows">
                {{{ Modal }}}
                {{{ InputEmail }}}
                {{{ InputLogin }}}
                {{{ InputFName }}}
                {{{ InputLName }}}
                {{{ InputNName }}}
                {{{ InputPhone }}}
                <div class="profile__manage">
                    {{#if changed}}{{{ ButtonSave }}}{{/if}}
                    {{{ ButtonChangePasswd }}}
                    {{{ ButtonLogout }}}
                </div>
            </form>
        `)
    }
}
