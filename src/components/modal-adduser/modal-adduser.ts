//@ts-nocheck

import Block from "../../core/Block";
import ModalCloseBtn from "../modal-wrap/modal-close-btn";
import { connect } from "../../utils/connect";
import AddUserForm from "./adduser-form";
import { addUsers } from "../../services/chat.ts";


class AddUserModal extends Block<Object>{
    init(){
        const onClickCloseBtnBind = this.onClickCloseBtn.bind(this);
        const onSubmitFormBind = this.onSubmitForm.bind(this);

        const ModalClose = new ModalCloseBtn({onClick: onClickCloseBtnBind});
        const Form = new AddUserForm({onSubmit: onSubmitFormBind});

        this.children = {
            ...this.children,
            ModalClose,
            Form,
        }
    }

    onClickCloseBtn(){
        window.store.set({showAddUserModal: false, addUserError: null, addUserSuccess: null});
    }

    componentDidUpdate(): boolean {
        return true;
    }

    async onSubmitForm(e: Event){
        e.preventDefault();
        window.store.set({addUserError: null, addUserSuccess: null});

        const formBlock = this.children.Form;
        const formElem = formBlock.getContent();
        const input = formElem.querySelector('[name="adduser-id"]');
        const value = input.value;
        if(!value){
            window.store.set({addUserError: 'User ID is required field'});
            return false;
        }

        const { selectedChat } = window.store.getState();
        const ids: number[] = [];
        value.split(',').map((idStr: string) => {
            const id = parseInt(idStr);
            if(Number.isNaN(id)) return;
            if(ids.indexOf(id) === -1) ids.push(id);
        })

        console.log('Add users submit', {users: ids, chatId: selectedChat.id});
        await addUsers({users: ids, chatId: selectedChat.id});
        input.value = '';
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
                    <div class="adduser-modal__content">
                        {{{ Form }}}
                    </div>
                </div>
            </div>
        `
    }
}

export default connect(({showAddUserModal}) => ({showAddUserModal}))(AddUserModal)
