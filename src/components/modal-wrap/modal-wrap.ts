import Block from "../../core/Block";
import ModalCloseBtn from "./modal-close-btn";
import isEqual from 'lodash/isEqual';


export default class ModalWrap extends Block{
    constructor(props) {
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

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Modal Wrap props');
        return true;
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
