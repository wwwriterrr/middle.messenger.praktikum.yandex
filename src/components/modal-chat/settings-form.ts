//@ts-nocheck

import Block from "../../core/Block";
import { connect } from "../../utils/connect";
import ChatAvatarInput from "./avatar-input";
import { setAvatar } from "../../services/chat";
import { Button } from "../button";
import { deleteChat } from "../../services/chat";


type SProps = {
    onSubmit: () => void,
}

class ChatSettingsForm extends Block<SProps>{
    constructor(props: SProps) {
        super({
            ...props,
            events: {
                submit: props.onSubmit
            }
        });
    }

    init(){
        const onChangeFileBind = this.onChangeFile.bind(this);
        const onDeleteClickBind = this.onDeleteClick.bind(this);

        const AvatarInput = new ChatAvatarInput({onChange: onChangeFileBind});
        const DeleteButton = new Button({label: 'Delete chat', type: 'button', classes: 'button_delete', onClick: onDeleteClickBind});

        this.children = {
            ...this.children,
            AvatarInput,
            DeleteButton,
        }
    }

    componentDidUpdate(): boolean {
        return true;
    }

    async onChangeFile (e: Event){
        const input: EventTarget | null = e.target;
        if(!input) return;
        const file = input.files[0];
        if(!file) return;

        const { settingsChat, chats } = window.store.getState();
        const data = new FormData();
        data.append('chatId', settingsChat.id);
        data.append('avatar', file);

        const newChatData: any = await setAvatar(data);
        const chat: any = {id: newChatData.id, title: newChatData.title, avatar: newChatData.avatar};

        const new_chats: any[] = [];
        chats.map((item: any) => {
            const new_item = {...item};
            if(new_item.id === newChatData.id){
                new_item.avatar = newChatData.avatar;
            }
            new_chats.push(new_item);
        })

        window.store.set({settingsChat: chat, selectedChat: chat, chats: new_chats});

        // console.log('New chat', newChatData);
        // console.log('Chats', chats);
    }

    onDeleteClick(){
        const { selectedChat } = window.store.getState();
        const chat_id = selectedChat.id;
        console.log('delete chat', chat_id);
        deleteChat({chatId: chat_id});
    }

    render() {
        const { settingsChat } = window.store.getState();
        const chatTitle = settingsChat.title;
        const chatAvatar = (settingsChat.avatar) ? `https://ya-praktikum.tech/api/v2/resources${settingsChat.avatar}` : '#';
        const hasAvatar = settingsChat.avatar;

        return `
            <form class="chat-settings">
                {{#if settingsChatLoading}}
                    <div class="chat-settings__row">
                        <div class="chat-settings__loader">Saving...</div>
                    </div>
                {{else}}
                    {{#if settingsChatError}}
                    <div class="chat-settings__row">
                        <div class="chat-settings__error">{{ settingsChatError }}</div>
                    </div>
                    {{/if}}
                    <div class="chat-settings__row">
                        <label class="chat-settings__avatar-wrap {{#if ${!hasAvatar}}}chat-settings__avatar-wrap_notset{{/if}}">
                            {{{ AvatarInput }}}
                            <img class="chat-settings__avatar-preview" src=" ${chatAvatar} " alt="Chat avatar" />
                        </label>
                    </div>
                    <div class="chat-settings__row">
                        {{{ DeleteButton }}}
                    </div>
                    
                    <!--<div class="chat-settings__row">
                        <div class="chat-settings__row__before">Chat title</div>
                        <input type="text" name="chat-title" placeholder="Enter title" value="${chatTitle}" />
                    </div>
                    <button class="chat-settings__submit" type="submit"></button>-->
                {{/if}}
            </form>
        `
    }
}

export default connect(({settingsChat, settingsChatLoading, settingsChatError}) => ({settingsChat, settingsChatLoading, settingsChatError}))(ChatSettingsForm)
