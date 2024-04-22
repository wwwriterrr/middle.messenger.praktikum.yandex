import Block from "../../core/Block";
import ModalCloseBtn from "./modal-close-btn";


interface IProps{
    modalTitle: string,
    ModalClose?: Block<object>,
    modalContent?: Block<object>,
    modalVisible?: boolean
}

export default class ModalWrap extends Block<IProps>{
    constructor(props: IProps) {
        super(props);

    }

    init(){
        const onClickCloseBtnBind = this.onClickCloseBtn.bind(this);

        const ModalClose = new ModalCloseBtn({onClick: onClickCloseBtnBind})

        this.children = {
            ...this.children,
            ModalClose
        }
    }

    onClickCloseBtn(){
        this.setProps({modalVisible: false});
    }

    render() {
        return `
            <div class="modal" style="display: {{#if modalVisible}}flex;{{else}}none;{{/if}}">
                <div class="modal__wrap">
                    <div class="modal__head">
                        <div class="modal__title">{{ modalTitle }}</div>
                        {{{ ModalClose }}}
                    </div>
                    <div class="modal__content">{{{ modalContent }}}</div>
                </div>
            </div>

        `
    }
}
