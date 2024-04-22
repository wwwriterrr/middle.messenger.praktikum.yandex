import Block from "../../core/Block";


export default class ChatButton extends Block{
    constructor(props) {
        super({
            ...props,
            events: {
                click: props.onClick || (() => {}),
            }
        });
    }

    render() {
        return `
            <button class="{{ classes }}" type="{{ type }}"></button>
        `
    }
}
