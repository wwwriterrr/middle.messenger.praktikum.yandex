import Block from "../../core/Block";
import ChatMessage from "../chat-message/message";


export default class MessagesList extends Block{
    constructor(props) {
        const MessageComponents = props.messages.reduce((acc, data) => {
            const component = new ChatMessage({message: data, attach: data.attach});
            acc[component._id] = component;
            return acc;
        }, {});

        super({
            ...props,
            MessageComponentsKeys: Object.keys(MessageComponents),
            ...MessageComponents
        })
    }

    render() {
        return `
            <div class="chat__messages">
                ${this.props.MessageComponentsKeys.map((key) => `{{{ ${key} }}}`).join('')}
            </div>
        `
    }
}
