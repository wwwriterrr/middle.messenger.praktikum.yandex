import Block from "../../core/Block";
import { connect } from "../../utils/connect";
import ChatAvatarInput from "./avatar-input";
import { setAvatar } from "../../services/chat";


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

        const AvatarInput = new ChatAvatarInput({onChange: onChangeFileBind});

        this.children = {
            ...this.children,
            AvatarInput,
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        return true;
    }

    async onChangeFile (e: Event){
        const input: HTMLInputElement | null = e.target;
        if(!input) return;
        const file = input.files[0];
        if(!file) return;

        const { settingsChat, selectedChat } = window.store.getState();
        const data = new FormData();
        data.append('chatId', settingsChat.id);
        data.append('avatar', file);

        const newChatData: any = await setAvatar(data);
        const chat: any = {id: newChatData.id, title: newChatData.title, avatar: newChatData.avatar};
        window.store.set({settingsChat: chat, selectedChat: chat});
    }

    render() {
        const { settingsChat } = window.store.getState();
        const chatTitle = settingsChat.title;
        const chatAvatar = settingsChat.avatar;

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
                        <label class="chat-settings__avatar-wrap {{#if ${!chatAvatar}}}chat-settings__avatar-wrap_notset{{/if}}">
                            {{{ AvatarInput }}}
                            <img class="chat-settings__avatar-preview" src="https://ya-praktikum.tech/api/v2/resources${chatAvatar}" alt="Chat avatar" />
                        </label>
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
