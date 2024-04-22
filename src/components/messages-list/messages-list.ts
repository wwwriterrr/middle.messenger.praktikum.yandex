import Block from "../../core/Block";
import ChatMessage from "../chat-message/message";


interface IProps{
    messages: Object[],
    attach?: Object[],
    MessageComponentsKeys?: [string]
}

export default class MessagesList extends Block<IProps>{
    constructor(props: IProps) {
        const MessageComponents = props.messages.reduce((acc: any, data: any) => {
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
                ${this.props.MessageComponentsKeys && this.props.MessageComponentsKeys.map((key: string) => `{{{ ${key} }}}`).join('')}
            </div>
        `
    }
}
