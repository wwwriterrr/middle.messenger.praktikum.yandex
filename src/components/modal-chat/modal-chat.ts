//@ts-nocheck

import Block from "../../core/Block";
import ModalCloseBtn from "../modal-wrap/modal-close-btn";
import { connect } from "../../utils/connect.ts";
import ChatSettingsForm from "./settings-form";


class ModalChat extends Block<Object>{
    init(){
        const onClickCloseBtnBind = this.onClickCloseBtn.bind(this);
        const onSubmitFormBind = this.onSubmitForm.bind(this);

        const ModalClose = new ModalCloseBtn({onClick: onClickCloseBtnBind});
        const SettingsForm = new ChatSettingsForm({onSubmit: onSubmitFormBind});

        this.children = {
            ...this.children,
            ModalClose,
            SettingsForm,
        }
    }

    onClickCloseBtn(){
        window.store.set({showChatModal: false});
    }

    onSubmitForm(e: Event){
        e.preventDefault();

        console.log('Prevent default submit');
    }

    componentDidUpdate(): boolean {
        return true;
    }

    render() {
        const { showChatModal } = window.store.getState();
        return `
            <div class="chat-modal" style="display: {{#if ${ showChatModal }}}flex{{else}}none{{/if}}">
                <div class="chat-modal__wrap">
                    <div class="chat-modal__head">
                        <div class="chat-modal__title">Chat settings</div>
                        {{{ ModalClose }}}
                    </div>
                    <div class="chat-modal__content">
                        {{{ SettingsForm }}}
                    </div>
                </div>
            </div>
        `
    }
}

export default connect(({showChatModal}) => ({showChatModal}))(ModalChat)
