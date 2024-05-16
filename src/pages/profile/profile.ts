import Block from "../../core/Block";
import { FormProfile, ModalWrap, ModalAvatar, AvatarButton } from "../../components";
import isEqual from 'lodash/isEqual';
import { connect } from "../../utils/connect.ts";


interface IProps {
    avatar?: string,
    FormProfile: Block<object>[],
    Modal?: Block<object>[]
}

class ProfilePage extends Block<IProps>{
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
        const { userData } = window.store.getState();
        //if(!user) window.router.go('/login');

        const userAvatar = (userData.avatar) ? `https://ya-praktikum.tech/api/v2/resources${userData.avatar}` : '/public/av1.jpg';
        window.store.set({userAvatar: userAvatar});

        this.setProps({nickname: userData.display_name, userAvatar: window.store.getState().userAvatar});

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
                        <img class="avatar__image" src="{{ userAvatar }}" alt="User avatar">
                        {{{ ButtonChangeAv }}}
                    </div>
                </div>
                <div class="profile__name">{{ nickname }}</div>
                {{{ FormProfile }}}
            </div>
        `
    }
}

const mapStateToPropsShort = ({userAvatar, userData}) => ({userAvatar, userData})

export default connect(mapStateToPropsShort)(ProfilePage)
