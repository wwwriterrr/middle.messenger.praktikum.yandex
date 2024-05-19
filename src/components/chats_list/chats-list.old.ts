//@ts-nocheck

import Block from "../../core/Block";
import ChatItem from "../chat_item/chat-item";


interface IProps{
    ChatComponentsKeys?: [string],
    ChatComponents?: Block<object>[],
    chats: any
}

export default class ChatsList extends Block<IProps>{
    constructor(props: IProps) {
        const ChatComponents = props.chats.reduce((acc: { [key: string]: Block<object> }, data: {}) => {
            const component = new ChatItem({item: data});
            acc[component._id] = component;
            return acc;
        }, {});

        super({
            ...props,
            ChatComponentsKeys: Object.keys(ChatComponents),
            ...ChatComponents
        })
    }

    render() {
        return `
            <div class="chats-list">
                ${this.props.ChatComponentsKeys && this.props.ChatComponentsKeys.map((key: string) => `{{{ ${key} }}}`).join('')}
            </div>
        `
    }
}
