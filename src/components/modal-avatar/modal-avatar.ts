import Block from "../../core/Block";
import Button from "../button/button";


interface IProps{
    ButtonSave?: Block<object>
}

export default class ModalAvatar extends Block<IProps>{
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

        const ButtonSave = new Button({label: 'Set avatar', type: 'primary', mode: 'action', classes: 'button_action button_hidden', onClick: onSaveAvatarBind});

        this.children = {
            ...this.children,
            ButtonSave
        }
    }

    onSaveAvatar(){
        console.log('save avatar');
    }

    render() {
        return `
            <form class="form avatar-form">
                <div class="avatar-form__error"></div>
                <label class="avatar-form__container">
                    <input class="avatar-form__input" type="file" name="avatar" accept="image/*">
                </label>
                <div class="avatar-form__preview-wrap">
                    <img class="avatar-form__preview-img" src="" alt="avatar">
                </div>
                {{{ ButtonSave }}}
            </form>
        `
    }
}
