import Block from "../../core/Block";
import ChatItem from "../chat_item/chat-item";


export default class ChatsList extends Block{
    constructor(props) {
        const ChatComponents = props.chats.reduce((acc, data) => {
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
                ${this.props.ChatComponentsKeys.map((key) => `{{{ ${key} }}}`).join('')}
            </div>
        `
    }
}
