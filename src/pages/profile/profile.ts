import Block from "../../core/Block";
import { FormProfile, ModalWrap, ModalAvatar, AvatarButton } from "../../components";
import isEqual from 'lodash/isEqual';


export default class ProfilePage extends Block{
    constructor(props) {
        super({
            ...props,
            FormProfile: new FormProfile({}),
            Modal: new ModalWrap({
                modalVisible: false,
                modalTitle: 'Change avatar',
                modalContent: new ModalAvatar({}),
            })
        });
    }

    init(){
        const onClickAvButtonBind = this.onClickAvButton.bind(this);

        const ButtonChangeAv = new AvatarButton({onClick: onClickAvButtonBind});

        this.children = {
            ...this.children,
            ButtonChangeAv,
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Profile page props');
        return true;
    }

    onClickAvButton(e){
        this.children.Modal.setProps({modalVisible: true});
        //this.children.AvatarModal.setProps({modalVisible: true});
    }

    render() {
        return `
            <div class="page__profile profile__wrap">
                {{{ Modal }}}
                <div class="avatar__wrap">
                    <div class="avatar__element {{#unless avatar }}avatar__element_notset{{/unless}}">
                        <img class="avatar__image" src="/public/av1.jpg" alt="User avatar">
                        {{{ ButtonChangeAv }}}
                    </div>
                </div>
                <div class="profile__name">{{nickname}}</div>
                {{{ FormProfile }}}
            </div>
        `
    }
}
