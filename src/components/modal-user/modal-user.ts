//@ts-nocheck

import Block from "../../core/Block";
import { connect } from "../../utils/connect";
import ModalCloseBtn from "../modal-wrap/modal-close-btn.ts";
import { Button } from "../button";
import { deleteUsers, getUsers } from "../../services/chat";


class UserModal extends Block<object>{
    init(){
        const onModalCloseBind = this.onModalClose.bind(this);
        const onProfileClickBind = this.onProfileClick.bind(this);
        const onDeleteClickBind = this.onDeleteClick.bind(this);

        const ModalClose = new ModalCloseBtn({onClick: onModalCloseBind});
        const DeleteButton = new Button({label: 'Delete user from chat', classes: 'button_delete', onClick: onDeleteClickBind});
        const ProfileButton = new Button({label: 'Profile settings', classes: 'button_action', onClick: onProfileClickBind});

        this.children = {
            ...this.children,
            ModalClose,
            DeleteButton,
            ProfileButton,
        }
    }

    onModalClose(){
        window.store.set({selectedUser: {}});
    }

    onProfileClick(){
        window.router.go('/settings');
    }

    onDeleteClick(){
        const { selectedUser, selectedChat } = window.store.getState();
        console.log(`Delete user from chat ${selectedChat.id}`, selectedUser.id);

        deleteUsers({users: [selectedUser.id], chatId: selectedChat.id});

        window.store.set({selectedUser: {}});
        getUsers({chat_id: selectedChat.id});
    }

    componentDidUpdate(): boolean {
        return true;
    }

    render() {
        const { selectedUser, userData } = window.store.getState();
        const isVisible = selectedUser.id;
        const userAvatar = (selectedUser.avatar) ? `https://ya-praktikum.tech/api/v2/resources${selectedUser.avatar}` : '/public/noavatar.svg';
        const userName = (selectedUser.display_name) ? selectedUser.display_name : (selectedUser.first_name) ? `${selectedUser.first_name} ${selectedUser.second_name}` : selectedUser.login;
        const showDeleteButton = (selectedUser.role !== 'admin');
        const showProfileButton = (selectedUser.id === userData.id);
        return `
            <div class="user-modal" style="display: {{#if ${ isVisible }}}flex{{else}}none{{/if}}">
                <div class="user-modal__wrap">
                    <div class="user-modal__head">
                        <div class="user-modal__title">User info</div>
                        {{{ ModalClose }}}
                    </div>
                    <div class="user-modal__content">
                        <img class="user-modal__avatar" src="${ userAvatar }" alt="${ userName }" />
                        <div class="user-modal__name user-modal__name_${ selectedUser.role }">${ userName }</div>
                        <div class="user-modal__manage">
                            {{#if deleteUserError}}
                            <div class="user-modal__error" style="color: red;font-weight: 400;">{{ deleteUserError }}</div>
                            {{/if}}
                            <div class="user-modal__delete-btn-wrap" style="display: {{#if ${ showDeleteButton }}}block{{else}}none{{/if}};">
                                {{{ DeleteButton }}}
                            </div>
                            <div class="user-modal__profile-btn-wrap" style="display: {{#if ${ showProfileButton }}}block{{else}}none{{/if}};">
                                {{{ ProfileButton }}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

export default connect(({selectedUser, deleteUserError}) => ({selectedUser, deleteUserError}))(UserModal)
