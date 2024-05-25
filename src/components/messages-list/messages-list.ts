//@ts-nocheck

import Block from "../../core/Block";
import { connect } from "../../utils/connect.ts";


class MessagesItems extends Block<object>{
    render() {
        const { messages } = window.store.getState();
        const is_empty = (messages.length === 0);

        return `
            <div class="messages">
                {{#if ${ is_empty }}}
                <div class="messages__empty">Messages is empty</div>
                {{/if}}
                {{{ messages }}}
            </div>
        `
    }
}

export default connect(({messages}) => ({messages}))(MessagesItems);
