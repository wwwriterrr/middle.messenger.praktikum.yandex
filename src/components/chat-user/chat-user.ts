import Block from "../../core/Block";


type UserObj = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string | null,
    avatar: string | null,
    login: string,
    role: string,
    click?: any
}

export default class ChatUser extends Block<UserObj>{
    constructor(props: UserObj) {
        super({
            ...props,
            userAvatar: (props.avatar) ? `https://ya-praktikum.tech/api/v2/resources${props.avatar}` : '/public/noavatar.svg',
            userName: (props.display_name) ? props.display_name : (props.first_name) ? `${props.first_name} ${props.second_name}` : props.login,
            events: {
                click: () => {
                    const user = {
                        id: props.id
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
