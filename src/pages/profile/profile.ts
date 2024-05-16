import Block from "../../core/Block";
import { FormProfile, ModalWrap, ModalAvatar, AvatarButton } from "../../components";
import isEqual from 'lodash/isEqual';
import { is_authenticated } from "../../services/auth.ts";


interface IProps {
    avatar?: string,
    FormProfile: Block<object>[],
    Modal?: Block<object>[]
}

export default class ProfilePage extends Block<IProps>{
    constructor(props: IProps) {
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

    async init(){
        // const is_auth = await is_authenticated();
        // if(!is_auth){
        //     window.router.go('/login');
        // }
        const { user } = window.store.getState();
        if(!user) window.router.go('/login');

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

    onClickAvButton(){
        this.children.Modal.setProps({modalVisible: true});
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
