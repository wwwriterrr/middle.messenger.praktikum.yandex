import Block from "../../core/Block";


export default class ModalCloseBtn extends Block{
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
            <button class="modal__close-btn"></button>
        `
    }
}