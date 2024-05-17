import Block from "../../core/Block";
import { connect } from "../../utils/connect";


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
        return `
            <div class="chats-list">
                {{#if showEmpty}}
                <div class="chats-list__empty">No chats</div>
                {{/if}}
                {{#if chatsError}}
                <div class="chats-list__error">{{ chatsError }}</div>
                {{/if}}
                {{{ chats }}}
            </div>
        `
    }
}

export default connect(({chatsLoading, chatsError}) => ({chatsLoading, chatsError}))(ChatsList);
