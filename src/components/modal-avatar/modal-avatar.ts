import Block from "../../core/Block";
import Button from "../button/button";
import AvatarInput from "./avatar-input";
import { avatar } from "../../services/user";
import { connect } from "../../utils/connect.ts";


interface IProps{
    ButtonSave?: Block<object>
}

class ModalAvatar extends Block<IProps>{
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                submit: (e: Event) => { e.preventDefault();e.stopImmediatePropagation(); }
            }
        });
    }

    init(){
        const onSaveAvatarBind = this.onSaveAvatar.bind(this);
        const onChangeFileBind = this.onChangeFile.bind(this);

        const AInput: AvatarInput = new AvatarInput({onChange: onChangeFileBind});
        const ButtonSave = new Button({label: 'Set avatar', type: 'primary', mode: 'action', classes: 'button_action button_hidden', onClick: onSaveAvatarBind});

        this.children = {
            ...this.children,
            ButtonSave,
            AInput,
        }
    }

    async onSaveAvatar(){
        console.log('save avatar');

        const input = this.children.AInput.element;
        const file = input.files[0];
        const data = new FormData();
        data.append('avatar', file);

        const status = await avatar(data);
        console.log('Avatar status', status);
    }

    onChangeFile(){
        this.children.ButtonSave.setProps({classes: 'button_action'});
    }

    render() {
        return `
            <form class="form avatar-form">
                {{#if isLoading}}
                    <div>Fetching data...</div>
                {{else}}
                    {{#if avatarError}}
                    <div class="avatar-form__error">{{ avatarError }}</div>
                    {{/if}}
                    <div class="avatar-form__error"></div>
                    <label class="avatar-form__container">
                        {{{ AInput }}}
                    </label>
                    <div class="avatar-form__preview-wrap">
                        <img class="avatar-form__preview-img" src="" alt="avatar">
                    </div>
                    {{{ ButtonSave }}}
                {{/if}}
            </form>
        `
    }
}

const mapStateToPropsShort = ({avatarField, isLoading, avatarError}) => ({avatarField, isLoading, avatarError})

export default connect(mapStateToPropsShort)(ModalAvatar)
