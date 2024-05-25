import Block from "../../core/Block";
import { apiUrl, TMessage } from "../../api/type";


export default class ChatMessage extends Block<TMessage>{

    render() {
        const { userData, users } = window.store.getState();
        const sender_user = users.filter((user: any) => user.id === this.props.user_id)[0];

        const is_self = (sender_user.id === userData.id);
        const senderAvatar = (sender_user.avatar) ? `${apiUrl}/resources${sender_user.avatar}` : '/public/noavatar.svg';
        const senderName = (sender_user.display_name) ? sender_user.display_name : (sender_user.first_name) ? `${sender_user.first_name} ${sender_user.second_name}` : sender_user.login;

        console.log(sender_user);

        return `
            <div class="message-item {{#if ${ is_self }}}message-item_self{{/if}}">
                <img class="message-item__avatar" src="${ senderAvatar }" alt="${ senderName }" />
                <div class="message-item__wrap">
                    <div class="message-item__head">
                        <div class="message-item__sender">${ senderName }</div>
                        <div class="message-item__time">{{ time }}</div>
                    </div>
                    <div class="message-item__content">
                        {{ content }}
                    </div>
                </div>
            </div>
        `
    }
}
