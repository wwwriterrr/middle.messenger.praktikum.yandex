import Block from "../../core/Block";


export default class ChatItem extends Block{
    constructor(props) {
        console.log(props);
        super(props);
    }

    render() {
        return `
            <div class="chat-item">
                <a href="#" class="chat-item__avatar-wrap" chat="{{ item.id }}">
                    <img class="chat-item__avatar" src="{{ item.avatar }}" alt="{{ item.name }} avatar">
                </a>
                <div class="chat-item__head">
                    <a href="#" class="chat-item__name" chat="{{ item.id }}">{{ item.name }}</a>
                    <div class="chat-item__date">{{ item.date }}</div>
                </div>
                <a href="#" class="chat-item__msg" chat="{{ item.id }}">{{ item.msg }}</a>
                <div class="chat-item__count" data-count="{{ item.count }}"></div>
            </div>
        `;
    }
}