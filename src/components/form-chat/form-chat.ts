//@ts-nocheck

import Block from "../../core/Block";
import ChatButton from "./chat-form-button";
import MessageInput from "./message-input";
import AttachModal from "../attach_modal/attach-modal";
import { connect } from "../../utils/connect";


class ChatForm extends Block{
    constructor(props) {
        super({
            ...props,
            events: {
                submit: (e) => { e.preventDefault();e.stopImmediatePropagation(); }
            },
            classes: ''
        });
    }

    init(){
        const onInputBlurBind = this.onInputBlur.bind(this);
        const onSendBind = this.onSend.bind(this);
        const onInputBind = this.onInput.bind(this);
        const onAttachOpenBind = this.onAttachOpen.bind(this);
        const onInputKeydownBind = this.onInputKeydown.bind(this);

        const InputMessage = new MessageInput({type: 'text', name: 'message', placeholder: 'Your message', classes: '', onBlur: onInputBlurBind, onInput: onInputBind, onKeyDown: onInputKeydownBind});
        const ButtonAttach = new ChatButton({classes: 'chat__form-attach-btn', type: 'button', onClick: onAttachOpenBind});
        const SendButton = new ChatButton({classes: 'chat__form-submit', type: 'submit', onClick: onSendBind});
        const ModalAttach = new AttachModal({});

        this.children = {
            ...this.children,
            InputMessage,
            ButtonAttach,
            SendButton,
            ModalAttach
        }
    }

    onInputBlur(e){
        const input = this.children.InputMessage;
        const value = e.target.value;

        input.setProps({value: value, classes: ''});
    }

    onInputKeydown(e: Event) {
        if(e.keyCode === 13){
            e.preventDefault();
            e.stopImmediatePropagation();

            this.children.SendButton.getContent().click();
        }
    }

    onSend(){
        const input = this.children.InputMessage;
        const value = input.props.value;

        if(!value){
            input.setProps({placeholder: 'Message cannot be empty', classes: 'chat__message_error', value: value});
            return false;
        }

        input.setProps({value: value, classes: '', placeholder: 'Your message'});

        console.log('Send message', {message: value});

        const { chatSocket } = window.store.getState();
        if(chatSocket){
            const message = {content: value, type: 'message'};
            chatSocket.send(JSON.stringify(message));
            input.setProps({value: ''});
        }
    }

    onInput(){
        const input = this.children.InputMessage;
        if(input.props.classes === 'chat__message_error'){
            input.setProps({classes: '', placeholder: 'Your message'});
            input.getContent().focus();
        }
    }

    onAttachOpen(){
        if(this.props.classes === '') this.setProps({classes: 'chat__form_attach'});
        else this.setProps({classes: ''});
    }

    render() {
        const { selectedChat } = window.store.getState();
        const is_visible = selectedChat.id;

        return `
            <form class="chat__form {{classes}}" style="display: {{#if ${ is_visible }}}grid{{else}}none{{/if}}">
                <div class="chat__form-avatar-wrap"><img class="chat__form-avatar" src="/public/av1.jpg" alt=""></div>
                {{{ ButtonAttach }}}
                {{{ InputMessage }}}
                {{{ SendButton }}}
                {{{ ModalAttach }}}
            </form>
        `
    }
}

export default connect(({ selectedChat }) => ({selectedChat}))(ChatForm);
