import Block from "../../core/Block";
import { connect } from "../../utils/connect";
import { Button } from "../button";


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
            //chatAvatar: (props.avatar) ? `https://ya-praktikum.tech/api/v2/resources${props.avatar}` : '/public/chat_empty.svg',
        })
    }

    init(){
        const onSettingsClickBind = this.onSettingsClick.bind(this);

        const ButtonSettings = new Button({label: '', classes: 'button_nofill button_chat-settings chat-item__settings', onClick: onSettingsClickBind});

        this.children = {
            ...this.children,
            ButtonSettings,
        }
    }

    onSettingsClick(){
        window.store.set({
            showChatModal: true,
            selectedChat: {id: this.props.id, title: this.props.title, avatar: this.props.avatar},
            settingsChat: {id: this.props.id, title: this.props.title, avatar: this.props.avatar},
        });
    }

    componentDidUpdate(): boolean {
        return true;
    }

    render(): string {
        const { selectedChat } = window.store.getState();
        const is_active = selectedChat.id === this.props.id;
        let chatAvatar = (this.props.avatar) ? `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}` : '/public/chat_empty.svg';
        if(selectedChat.id === this.props.id && selectedChat.avatar) chatAvatar = `https://ya-praktikum.tech/api/v2/resources${selectedChat.avatar}`;

        const msg: string = (this.props.last_message) ? this.props.last_message : 'No messages';

        return `
            <div class="chat-item {{#if ${ is_active }}}chat-item_active{{/if}}" data-id="{{ id }}">
                <div class="chat-item__avatar-wrap">
                    <img class="chat-item__avatar" src="${ chatAvatar }" alt="{{ title }}">
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

export default connect(({selectedChat, settingsChat}) => ({selectedChat, settingsChat}))(ChatItem)
