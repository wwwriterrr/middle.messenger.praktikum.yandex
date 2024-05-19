//@ts-nocheck

import Block from "../../core/Block";
import { ChatMessage } from "../chat-message";
import { connect } from "../../utils/connect";
import MessagesItems from "./messages-list";


class Messages extends Block<object>{
    init(){
        const { messages } = window.store.getState();

        const Messages = new MessagesItems({users: this.mapMessagesToCompoennt(messages) || []});

        this.children = {
            ...this.children,
            Messages,
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps.messages !== newProps.messages) {

            this.children.Messages.setProps({
                messages: this.mapMessagesToCompoennt(newProps.messages) || [],
            })
        }

        return true;
    }

    mapMessagesToCompoennt(messages: {
        id: number,
        content: string,
        user_id: number,
        time: string,
        file?: {
            id: number,
            user_id: number
            path: string,
            filename: string,
            content_type: string,
            content_size: number,
            upload_date: string,
        }
    }[]) {
        return messages?.map(({id, content, user_id, time, file}) =>  new ChatMessage({id, content, user_id, time, file}));
    }

    render() {
        const { selectedChat } = window.store.getState();
        const is_selected = selectedChat.id;

        return `
            <div class="chat__messages">
                {{#if ${ is_selected }}}
                    {{{ Messages }}}
                {{else}}
                    <div class="chat__messages-empty" style="font-weight: 400;font-size: .8em;">To start chatting, select chat</div>
                {{/if}}
            </div>
        `
    }
}

export default connect(({selectedChat, messages}) => ({selectedChat, messages}))(Messages)
