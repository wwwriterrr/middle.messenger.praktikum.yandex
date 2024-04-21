import Block from "../../core/Block";


export default class ChatMessage extends Block{
    constructor(props) {
        super(props);
    }

    render() {
        return `
            <div id="message-{{message.id}}" class="message {{#if_eq message.sender 'self'}}message_self{{/if_eq}}">
                <div class="message__avatar"><img src="{{message.avatar}}" alt="{{message.sender}}"></div>
                <div class="message__wrap">
                    <div class="message__head">
                        <div class="message__sender">{{#if_eq message.sender "self"}}Rocky{{else}}{{message.sender}}{{/if_eq}}</div>
                        <div class="message__date">{{message.date}}</div>
                    </div>
                    <div class="message__text">{{message.msg}}</div>
                </div>
            </div>
            {{#if message.attach}}
            <div class="message-attach {{#if_eq message.sender 'self'}}message-attach_self{{/if_eq}}" data-message="{{message.id}}">
                <div class="message-attach__wrap" data-length="{{message.attach.length}}">
                    {{#each message.attach}}
                    <div class="message-attach__item"><img src="{{this}}" alt=""></div>
                    {{/each}}
                </div>
            </div>
            {{/if}}
        `
    }
}