import Block from "../../core/Block";
import { connect } from "../../utils/connect";
import { ChatUser } from "../chat-user";
import UsersList from "./users-list";
import { AddUserModal } from "../modal-adduser";
import {Button} from "../button";


type UserObj = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string | null,
    avatar: string | null,
    login: string,
    role: string,
}

class ChatUsers extends Block<any>{
    init(){
        const { users } = window.store.getState();

        const addUserClickBind = this.addUserClick.bind(this);
        const onUserClickBind = this.onUserClick.bind(this);

        const Users = new UsersList({users: this.mapUsersToCompoennt(users, onUserClickBind) || []});
        const Modal = new AddUserModal({});
        const AddUserButton = new Button({label: 'Add user', classes: 'button_action', onClick: addUserClickBind})

        this.children = {
            ...this.children,
            Users,
            Modal,
            AddUserButton,
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const onUserClickBind = this.onUserClick.bind(this);
        if(oldProps.users !== newProps.users) {

            this.children.Users.setProps({
                users: this.mapUsersToCompoennt(newProps.users, onUserClickBind) || [],
            })
        }

        return true;
    }

    mapUsersToCompoennt(users: UserObj[], hundler: () => void) {
        return users?.map(({avatar, id, first_name, second_name, display_name, role, login}) =>  new ChatUser({login, role, first_name, second_name, display_name, avatar, click: hundler, id}))
    }

    onUserClick(user: any){
        console.log('User click', user);
    }

    addUserClick(){
        console.log('Add user click');
        window.store.set({showAddUserModal: true});
    }

    render() {
        const { selectedChat } = window.store.getState();
        const isChatSelected = selectedChat.id;
        const chatTitle = selectedChat.title;

        return `
            <div class="users-list">
                {{{ Modal }}}
                {{#if ${isChatSelected}}}
                    <div class="users-list__title">${ chatTitle }</div>
                    {{{ Users }}}
                {{else}}
                    <div class="users-list__nochat">Select chat</div>
                {{/if}}
                <div class="users-list__manage" style="display: {{#if ${isChatSelected}}}block{{else}}none{{/if}};">
                    {{{ AddUserButton }}}
                </div>
            </div>
        `
    }
}

export default connect(({ selectedChat, users }) => ({selectedChat, users}))(ChatUsers);
