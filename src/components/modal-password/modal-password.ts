import Block from "../../core/Block";
import Input from "../input/input-element";
import Button from "../button/button";


interface IProps{
    InputOldPasswd?: Block<object>,
    InputNewPasswd?: Block<object>,
    InputRtPasswd?: Block<object>,
    ButtonRemember?: Block<object>,
    ButtonSubmit?: Block<object>,
}

export default class ModalPassword extends Block<IProps>{
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                submit: (e: Event) => { e.preventDefault();e.stopImmediatePropagation(); },
            }
        });
    }

    init(){
        const onChangeInputBind = this.onInputBlur.bind(this);
        const onSubmitBind = this.onSubmit.bind(this);

        const InputOldPasswd = new Input({label: 'Enter the old password', type: 'password', name: 'oldPassword', value: '', error: null, onBlur: onChangeInputBind})
        const InputNewPasswd = new Input({label: 'Come up with a new password', type: 'password', name: 'newPassword', value: '', error: null, onBlur: onChangeInputBind})
        const InputRtPasswd = new Input({label: 'Repeat the new password', type: 'password', name: 'retypePassword', value: '', error: null, onBlur: onChangeInputBind})
        const ButtonRemember = new Button({label: 'I don\'t remember the password', classes: 'button_nofill button-greytext button_normweight', type: 'link', page: 'Remember password (authenticated)'})
        const ButtonSubmit = new Button({label: 'Change password', classes: 'button_action', onClick: onSubmitBind})

        this.children = {
            ...this.children,
            InputOldPasswd,
            InputNewPasswd,
            InputRtPasswd,
            ButtonRemember,
            ButtonSubmit
        }
    }

    onSubmit(){
        const {InputOldPasswd, InputNewPasswd, InputRtPasswd} = this.children;
        const errors: any = [];

        [InputOldPasswd, InputNewPasswd, InputRtPasswd].map((input) => {
            if(!input.props.value) errors.push([input, 'Field cannot be empty']);
            if(input.props.error) errors.push([input, input.props.error]);
        })

        if(errors.length !== 0){
            errors.map((err: [Block<object>, string]) => {
                err[0].setProps({error: err[1]});
            })
            return false;
        }

        if(InputNewPasswd.props.value !== InputRtPasswd.props.value){
            InputNewPasswd.setProps({error: 'The values are not equal'});
            InputRtPasswd.setProps({error: 'The values are not equal'});
            return false;
        }

        console.log('Submit', {password: InputOldPasswd.props.value, new_password: InputNewPasswd.props.value});
    }

    render() {
        return `
            <form class="form passwd-form">
                {{{ InputOldPasswd }}}
                {{{ InputNewPasswd }}}
                {{{ InputRtPasswd }}}
                {{{ ButtonRemember }}}
                {{{ ButtonSubmit }}}
            </form>
        `
    }
}
