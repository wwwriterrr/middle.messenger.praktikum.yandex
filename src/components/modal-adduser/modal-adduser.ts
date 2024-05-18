import Block from "../../core/Block";
import ModalCloseBtn from "../modal-wrap/modal-close-btn";
import { connect } from "../../utils/connect.ts";


class AddUserModal extends Block<Object>{
    init(){
        const onClickCloseBtnBind = this.onClickCloseBtn.bind(this);

        const ModalClose = new ModalCloseBtn({onClick: onClickCloseBtnBind});

        this.children = {
            ...this.children,
            ModalClose,
        }
    }

    onClickCloseBtn(){
        window.store.set({showAddUserModal: false});
    }

    componentDidUpdate(): boolean {
        return true;
    }

    render() {
        const { showAddUserModal } = window.store.getState();
        return `
            <div class="adduser-modal" style="display: {{#if ${ showAddUserModal }}}flex{{else}}none{{/if}}">
                <div class="adduser-modal__wrap">
                    <div class="adduser-modal__head">
                        <div class="adduser-modal__title">Add user in chat</div>
                        {{{ ModalClose }}}
                    </div>
                </div>
            </div>
        `
    }
}

export default connect(({showAddUserModal}) => ({showAddUserModal}))(AddUserModal)
