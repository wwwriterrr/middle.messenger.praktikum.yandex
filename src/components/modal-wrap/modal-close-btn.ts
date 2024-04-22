import Block from "../../core/Block";


interface IProps{
    onClick: () => void
}

export default class ModalCloseBtn extends Block<IProps>{
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
            <button class="modal__close-btn"></button>
        `
    }
}
