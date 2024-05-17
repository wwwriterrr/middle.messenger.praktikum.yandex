import Block from "../../core/Block";
import ModalCloseBtn from "../modal-wrap/modal-close-btn";
import { connect } from "../../utils/connect.ts";


class ModalChat extends Block<Object>{
    init(){
        const onClickCloseBtnBind = this.onClickCloseBtn.bind(this);

        const ModalClose = new ModalCloseBtn({onClick: onClickCloseBtnBind})

        this.children = {
            ...this.children,
            ModalClose
        }
    }

    onClickCloseBtn(){
        window.store.set({showChatModal: false});
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        return true;
    }

    render() {
        const { showChatModal } = window.store.getState();
        return `
            <div class="chat-modal" style="display: {{#if ${ showChatModal }}}flex{{else}}none{{/if}}">
                <div class="chat-modal__wrap">
                    <div class="chat-modal__head">
                        <div class="chat-modal__title"></div>
                        {{{ ModalClose }}}
                    </div>
                    <div class="chat-modal__content"></div>
                </div>
            </div>
        `
    }
}

export default connect(({showChatModal}) => ({showChatModal}))(ModalChat)
