import Block from "../../core/Block";
import { connect } from "../../utils/connect";
import AvatarEmpty from '/public/chat_empty.svg';
import {Button} from "../button";


interface IProps{
    title: string,
    avatar: string | null,
    click: any,
    id: number,
    activeId: number | null,
    unread_count: number,
    last_message: string | null,
}

class ChatItem extends Block<IProps>{
    constructor(props: IProps) {
        super({
            ...props,
            active: props.activeId === props.id,
            events: {
                click: () => {
                    const chat = {
                        title: props.title,
                        avatar: props.avatar,
                        id: props.id
                    }
                    props?.click(chat)
                }
            },
            chatAvatar: props.avatar || AvatarEmpty,
        })
    }

    init(){
        const ButtonSettings = new Button({label: '', classes: 'button_nofill button_chat-settings chat-item__settings', onClick: () => { window.store.set({showChatModal: true}); }});

        this.children = {
            ...this.children,
            ButtonSettings,
        }
    }

    componentDidUpdate(oldProps, newProps): boolean {
        return true;
    }

    render(): string {
        console.log(this.props.last_message);
        const { selectedChat } = window.store.getState();
        const is_active = selectedChat.id === this.props.id;

        const msg: string = (this.props.last_message) ? this.props.last_message : 'No messages';

        return `
            <div class="chat-item {{#if ${ is_active }}}chat-item_active{{/if}}" data-id="{{ id }}">
                <div class="chat-item__avatar-wrap">
                    <img class="chat-item__avatar" src="{{ chatAvatar }}" alt="{{ title }}">
                </div>
                <div class="chat-item__head">
                    <div class="chat-item__name">{{ title }}</div>
                    {{{ ButtonSettings }}}
                </div>
                <div class="chat-item__msg {{#if ${!this.props.last_message}}}chat-item__msg_empty{{/if}}">${ msg }</div>
                <div class="chat-item__count" data-count="{{ unread_count }}"></div>
            </div>
        `
    }
}

export default connect(({selectedChat}) => ({selectedChat}))(ChatItem)
