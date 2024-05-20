//@ts-nocheck

import Block from "../../core/Block";
import { Button, ChatsList, ChatUsers, Messages, ChatForm, ModalWrap, ModalAddChat, ModalChat, ChatItem } from "../../components";
import { logout } from "../../services/auth";
import {getChats, getToken, getUsers} from "../../services/chat";
import { connect } from "../../utils/connect";


interface IProps{
    ButtonProfile: Block<object>,
    Chats: Block<object>,
    Messages: Block<object>,
    MessageForm: Block<object>
}

interface IChat{
    id: number,
    title: string,
    avatar: string
}

type ChatObj = {
    id: number,
    title: string | null,
    avatar: string | null,
    unread_count: number,
    last_message: null | any
}

class ChatPage extends Block<IProps>{
    async componentDidMount() {
        await getChats();
    }

    constructor(props: IProps) {
        super({
            ...props,
            Modal: new ModalWrap({
                modalVisible: false,
                modalTitle: 'Add chat',
                modalContent: new ModalAddChat({}),
            }),
            ChatModal: new ModalChat(),
        });
    }

    async init(){
        const onLogoutBind = this.onLogout.bind(this);
        const onChatClickBind = this.onChatClick.bind(this);

        const ButtonProfile = new Button({label: 'Profile', classes: 'button_nofill button-greytext button-prof-left', page: 'profile', onClick: () => { window.router.go('/settings'); }});
        const ButtonLogout = new Button({label: 'Log Out', classes: 'button_nofill button_logout', onClick: onLogoutBind});
        const ButtonAddChat = new Button({label: 'Add chat', classes: 'button_nofill button_greytext', onClick: () => {this.children.Modal.setProps({modalVisible: true});}});
        const Chats = new ChatsList({chats: this.mapChatsToCompoennt(this.chats, null, onChatClickBind) || []});
        const Users = new ChatUsers({});
        const MessagesWrap = new Messages({});
        const MessageForm = new ChatForm({});

        this.children = {
            ...this.children,
            ButtonProfile,
            ButtonLogout,
            ButtonAddChat,
            Chats,
            Users,
            MessagesWrap,
            MessageForm,
        }

        // Scroll to last message
        setTimeout(() => {
            const msgs = document.querySelectorAll('.message-container');
            if(msgs.length !== 0) {
                msgs[msgs.length-1].scrollIntoView({block: "center",});
            }
        }, 100)

    }

    mapChatsToCompoennt(chats: ChatObj[], activeId: number | null, hundler: any) {
        return chats?.map(({title, avatar, id, unread_count, last_message}) =>  new ChatItem({title, avatar, click: hundler, id, activeId, unread_count, last_message}))
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const onChatClickBind = this.onChatClick.bind(this);
        if(oldProps.chats !== newProps.chats) {

            this.children.Chats.setProps({
                chats: this.mapChatsToCompoennt(newProps.chats, null, onChatClickBind) || [],
                showEmpty: newProps.chats.length === 0
            })
        }

        return true;
    }


    onChatClick(chat: IChat){
        //this.setProps({selectedChat: chat});
        window.store.set({selectedChat: chat, messages: []});
        getUsers({chat_id: chat.id});
        getToken({chat_id: chat.id}).then((token: string | null) => {
            console.log('Token is: ', token);
            const { userData, chatSocket } = window.store.getState();

            if(chatSocket){
                chatSocket.close();
                window.store.set({chatSocket: null});
            }

            const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${ userData.id }/${ chat.id }/${ token }`);
            window.store.set({chatSocket: socket});

            let pingInterval: any = null;
            socket.addEventListener('open', () => {
                console.log('Chat socket is open');

                /* Get messages */
                const message = {content: 0, type: 'get old'}
                socket.send(JSON.stringify(message));
                /* --- */

                pingInterval = setInterval(() => {
                    socket.send(JSON.stringify({type: 'ping'}));
                }, 30*1000);
            });

            socket.addEventListener('close', () => {
                console.log('Chat socket is closed');
                clearInterval(pingInterval);
            });

            socket.addEventListener('message', event => {
                try{
                    const data = JSON.parse(event.data);
                    console.log('Data received', data);

                    const { messages } = window.store.getState();

                    if(data){
                        if(Array.isArray(data)){
                            if(data.length !== 0){
                                const new_messages = [...data, ...messages].reverse();
                                window.store.set({messages: new_messages});
                            }
                        }else{
                            if(data.type !== 'pong'){
                                const new_messages = [...messages, ...[data]];
                                window.store.set({messages: new_messages});
                            }
                        }
                    }
                }catch (error: Error) {
                    console.log('Data parse error', error.message);
                }
            });
        });
    }

    onLogout() {
        logout();
        window.store.set({user: null, userData: {}});
        window.router.go('/login');
    }

    render() {
        return `
            <div class="container">
                <div class="chat-page">
                    {{{ Modal }}}
                    {{{ ChatModal }}}
                    <div class="chat__side">
                        <div class="chat__side-head">
                            <div class="chat__side-mng">
                                {{{ ButtonProfile }}}
                                {{{ ButtonLogout }}}
                            </div>
                            <label class="chat__search-wrap">
                                <input class="chat__search-input" type="text" placeholder="Search" >
                            </label>
                            <div class="chat__bottom-mng">
                                {{{ ButtonAddChat }}}
                            </div>
                        </div>
                        {{{ Chats }}}
                    </div>
                    <div class="chat__header">
                        {{{ Users }}}
                    </div>
                    {{{ MessagesWrap }}}
                    <div class="chat__form-wrap">
                        {{{ MessageForm }}}
                    </div>
                </div>
            </div>
        `
    }
}

export default connect(({chats}) => ({chats}))(ChatPage)
