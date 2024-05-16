import Block from "../../core/Block";
import { connect } from "../../utils/connect";
import ChatItem from "../chat_item/chat-item.ts";


interface IProps{
    ChatComponentsKeys?: [string],
    ChatComponents?: Block<object>[],
    chats: any
}

class ChatsList extends Block<any>{
    constructor(props: IProps) {
        super({
            ...props,
            showEmpty: props.chats.length === 0,
            events: {
                click: props.onClick
            },
        })
    }

    render(): string {
        console.log('List block chats', this.props.chats);
        return `
            <div class="chats-list">
                {{#if showEmpty}}
                <div class="chats-list__empty">No chats</div>
                {{/if}}
                {{{ chats }}}
            </div>
        `
    }
}

export default connect(({chatsLoading}) => ({chatsLoading}))(ChatsList);
