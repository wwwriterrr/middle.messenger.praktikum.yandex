import Block from "../../core/Block";


interface IProps{
    onClick?: () => void
}

export default class AvatarButton extends Block<IProps>{
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
            <button class="avatar__button"></button>
        `
    }
}
