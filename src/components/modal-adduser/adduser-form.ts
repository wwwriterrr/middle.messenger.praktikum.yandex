//@ts-nocheck

import Block from "../../core/Block";
import { Input } from "../input";
import { Button } from "../button";
import { connect } from "../../utils/connect";


type TProps = {
    onSubmit: () => void,
}

class AddUserForm extends Block<TProps>{
    constructor(props: TProps) {
        super({
            ...props,
            events: {
                submit: props.onSubmit
            }
        });
    }

    init(){
        const UserIdInput = new Input({name: 'adduser-id', type: 'text', placeholder: `Users ID\'s`});
        const SubmitButton = new Button({label: 'Add', classes: 'button_action', type: 'submit'});

        this.children = {
            ...this.children,
            UserIdInput,
            SubmitButton
        }
    }

    componentDidUpdate(): boolean {
        return true;
    }

    render() {
        return `
            <form class="adduser-form">
                {{#if addUserLoading}}
                    <div class="adduser-form__row">Fetching...</div>
                {{else}}
                    {{#if addUserError}}
                    <div class="adduser-form__row">
                        <div class="adduser-form__error">{{ addUserError }}</div>
                    </div>
                    {{/if}}
                    {{#if addUserSuccess}}
                    <div class="adduser-form__row">
                        <div class="adduser-form__success">{{ addUserSuccess }}</div>
                    </div>
                    {{/if}}
                    <div class="adduser-form__row">
                        <span class="adduser-form__info">
                            Enter the ID of the user you want to add to the chat. You can specify multiple users separated by commas: 13, 14
                        </span>
                    </div>
                    <div class="adduser-form__row">
                        {{{ UserIdInput }}}
                    </div>
                    {{{ SubmitButton }}}
                {{/if}}
            </form>
        `
    }
}

export default connect(({addUserError, addUserLoading, addUserSuccess}) => ({addUserError, addUserLoading, addUserSuccess}))(AddUserForm)
