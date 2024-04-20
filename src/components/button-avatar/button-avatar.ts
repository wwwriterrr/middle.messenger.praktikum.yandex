import Block from "../../core/Block";


export default class AvatarButton extends Block{
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
            <button class="avatar__button"></button>
        `
    }
}