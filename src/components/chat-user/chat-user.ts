//@ts-nocheck

import Block from "../../core/Block";
import { apiUrl } from "../../api/type";
import { TUser } from "../../api/type";


export default class ChatUser extends Block<TUser>{
    constructor(props: TUser) {
        super({
            ...props,
            userAvatar: (props.avatar) ? `${apiUrl}/resources${props.avatar}` : '/public/noavatar.svg',
            userName: (props.display_name) ? props.display_name : (props.first_name) ? `${props.first_name} ${props.second_name}` : props.login,
            events: {
                click: () => {
                    const user = {
                        id: props.id,
                        avatar: props.avatar,
                        role: props.role,
                        first_name: props.first_name,
                        second_name: props.second_name,
                        display_name: props.display_name,
                        login: props.login,
                    }
                    props?.click(user);
                }
            },
        });
    }

    render() {
        return `
            <div class="chat-user chat-user_{{role}}" data-id="{{ id }}">
                <img class="chat-user__avatar" src="{{ userAvatar }}" alt="{{ userName }}" />
                <div class="chat-user__name">{{ userName }}</div>
            </div>
        `
    }
}
