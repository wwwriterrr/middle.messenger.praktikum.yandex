import Block from "../../core/Block";
import isEqual from 'lodash/isEqual';
import Button from "../button/button";


export default class ModalAvatar extends Block{
    constructor(props) {
        super({
            ...props,
            events: {
                submit: (e) => { e.preventDefault();e.stopImmediatePropagation(); }
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

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Modal Avatar props');
        return true;
    }

    onSaveAvatar(e){
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
