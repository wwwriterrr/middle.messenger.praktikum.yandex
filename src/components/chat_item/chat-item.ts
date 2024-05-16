import Block from "../../core/Block";


interface IProps{
    name: string,
    avatar: string,
    click: any,
    id: number,
    activeId: number,
}

export default class ChatItem extends Block<IProps>{
    constructor(props) {
        super({
            ...props,
            active: props.activeId === props.id,
            events: {
                click: () => {
                    const chat = {
                        name: props.name,
                        avatar: props.avatar,
                        id: props.id
                    }
                    props?.click(chat)
                }
            }
        })
    }

    render(): string {
        return `
            <div class="chat-item">
                chat
            </div>
        `;
    }
}
