import Block from "../../core/Block";
import { Button, ChatsList, MessagesList, ChatForm, ModalWrap, ModalAddChat, ModalChat, ChatItem } from "../../components";
import { logout } from "../../services/auth";
import { getChats } from "../../services/chat";
import { connect } from "../../utils/connect";


interface IProps{
    ButtonProfile: Block<object>,
    Chats: Block<object>,
    Messages: Block<object>,
    MessageForm: Block<object>
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
        /*const chats = [
            {id: 1, avatar: '/public/av1.jpg', name: 'Batman', msg: 'Stuff sooner subjects indulgence forty child theirs unpleasing supported projecting certain.', date: '12:10', count: 4},
            {id: 2, avatar: '/public/av2.jpg', name: 'Robin', msg: 'Up above afford furniture worse. Them dine position warrant expense he.', date: 'yda'},
            {id: 3, avatar: '/public/av3.jpg', name: 'Pacman', msg: 'Welcomed result continued remainder endeavor tastes rank quit. ', date: 'md', count: '99+'},
            {id: 4, avatar: '/public/av4.jpg', name: 'Rastaman', msg: 'Ready attention inquietude must differed.', date: '10.01 2021'},
            {id: 5, avatar: '/public/av5.jpg', name: 'Gosling', msg: 'Remark impossible indeed quitting plan appearance.', date: '21.03.2019'},
        ]*/
        const messages = [
            {id: 3251, sender: 'Robin', avatar: '/public/av2.jpg', msg: 'Hey there!', date: '9:32',
            attach: [
                '/public/attach1.jpg'
            ]
            },
            {id: 3252, sender: 'Robin', avatar: '/public/av2.jpg', msg: 'Kept style wishing future express earnestly deficient.\n\nFavourable added moments room viewing thought rent kindness elsewhere admitting heart whose decisively ability. Gate engrossed taste excuse commanded under nor pasture gay sentiments. Folly concealed sold boisterous had means have tedious devonshire mean. Civility talked same spoil you sensible father. Sold just company repair formal elinor away absolute wondered tried dearest hung spirit no pulled. ', date: '11:41',
            attach: [
                '/public/attach3.jpg',
                '/public/attach4.jpg'
            ]},
            {id: 3253, sender: 'Robin', avatar: '/public/av2.jpg', msg: 'Lasting regret sweetness curiosity. Built children anxious on. Perceive hardly sure farther drawings resembled resolved mile half miss zealously estate ﻿no enjoyment strongly down cannot. Moonlight desire indulgence indulgence joy civility greatly upon chief proposal arrival knew. Head precaution equal piqued possible continued seemed must myself mind surprise started prepare sympathize with.', date: '11:55',
            attach: [
                '/public/attach1.jpg',
                '/public/attach2.jpg',
                '/public/attach3.jpg',
                '/public/attach4.jpg',
                '/public/attach5.jpg',
            ]},
            {id: 3254, sender: 'self', avatar: '/public/av1.jpg', msg: 'OK', date: '12:01', attach: []},
            {id: 3255, sender: 'Robin', avatar: '/public/av2.jpg', msg: 'Stuff sooner subjects indulgence forty child theirs unpleasing supported projecting certain.', date: '12:10', attach: []},
        ]

        const onLogoutBind = this.onLogout.bind(this);
        const onChatClickBind = this.onChatClick.bind(this);

        const ButtonProfile = new Button({label: 'Profile', classes: 'button_nofill button-greytext button-prof-left', page: 'profile', onClick: () => { window.router.go('/settings'); }});
        const ButtonLogout = new Button({label: 'Log Out', classes: 'button_nofill button_logout', onClick: onLogoutBind});
        const ButtonAddChat = new Button({label: 'Add chat', classes: 'button_nofill button_greytext', onClick: () => {this.children.Modal.setProps({modalVisible: true});}});
        //const Chats = new ChatsList({chats: chats});
        const Chats = new ChatsList({chats: this.mapChatsToCompoennt(this.chats, null, onChatClickBind) || []});
        const Messages = new MessagesList({messages: messages});
        const MessageForm = new ChatForm({});

        this.children = {
            ...this.children,
            ButtonProfile,
            ButtonLogout,
            ButtonAddChat,
            Chats,
            Messages,
            MessageForm
        }

        // Scroll to last message
        setTimeout(() => {
            const msgs = document.querySelectorAll('.message-container');
            if(msgs.length !== 0) {
                msgs[msgs.length-1].scrollIntoView({block: "center",});
            }
        }, 100)

    }

    mapChatsToCompoennt(chats, activeId, hundler) {
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


    onChatClick(chat: any){
        //this.setProps({selectedChat: chat});
        window.store.set({selectedChat: chat});
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
                        <!-- Chat info there -->
                    </div>
                    {{{ Messages }}}
                    <div class="chat__form-wrap">
                        {{{ MessageForm }}}
                    </div>
                </div>
            </div>
        `
    }
}

export default connect(({chats}) => ({chats}))(ChatPage)
