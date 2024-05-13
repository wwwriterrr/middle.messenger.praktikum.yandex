import Block from "../../core/Block";


interface IProps{
    classes?: string,
    type: string,
    onClick?: () => void
}

export default class ChatButton extends Block<IProps>{
    constructor(props: IProps) {
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
