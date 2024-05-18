import Block from "../../core/Block";
import { connect } from "../../utils/connect";


interface IProps{
    chats: any,
    onClick: () => void,
}

class ChatsList extends Block<IProps>{
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
