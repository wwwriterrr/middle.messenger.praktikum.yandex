import Block from "../../core/Block";
import { Button } from "../button";
import { addChat } from "../../services/chat";
import { connect } from "../../utils/connect";


class ModalAddChat extends Block<any>{
    init(){
        const onAddChatBind = this.onAddChat.bind(this);

        const ButtonSubmit = new Button({label: 'Add', classes: 'button_action', onClick: onAddChatBind});

        this.children = {
            ...this.children,
            ButtonSubmit,
        }
    }

    async onAddChat () {
        console.log('Start create chat');
        const input: HTMLInputElement | null = document.querySelector('[name="chat-title"]');
        if(!input) return;

        const title: string = input.value;

        const response = await addChat({title: title});

        console.log('Add chat response', response);
    }

    render(): string {
        return `
            <div class="container">
                <div class="add-chat">
                    {{#if addChatLoading}}
                        <div>Create chat...</div>
                    {{else}}
                        {{#if addChatError}}
                        <div class="add-chat__error">{{ addChatError }}</div>
                        {{/if}}
                        <input class="add-chat__input" type="text" name="chat-title" placeholder="Chat title" />
                        {{{ ButtonSubmit }}}
                    {{/if}}
                </div>
            </div>
        `
    }
}

const mapStateToPropsShort = ({addChatLoading, addChatError}) => ({addChatLoading, addChatError})

export default connect(mapStateToPropsShort)(ModalAddChat)
