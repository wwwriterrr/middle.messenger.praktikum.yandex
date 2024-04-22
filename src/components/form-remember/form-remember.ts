import Block from "../../core/Block"
import { Button } from "../button"
import { Input } from "../input"


export default class FormRemember extends Block{
    constructor(props) {
        super({
            ...props,
            events: {
                submit: (e) => { e.preventDefault();e.stopImmediatePropagation(); }
            }
        });
    }

    init(){
        const onBlurBind = this.onInputBlur.bind(this);
        const onSubmitBind = this.submitForm.bind(this);

        const InputEmail = new Input({label: 'Email or phone number', type: 'text', name: 'email_login', value: '', error: null, classes: '', onBlur: onBlurBind});
        const ButtonSubmit = new Button({label: 'Send code', type: 'primary', mode: 'action', onClick: onSubmitBind});

        this.children = {
            ...this.children,
            InputEmail,
            ButtonSubmit
        }
    }

    submitForm(){
        const input = this.children.InputEmail;
        const value = input.props.value;

        if(!value) return;
        if(input.props.error) return;

        console.log('submit', {login: value});
    }

    render() {
        return `
            <Form class="form__rpassword">
                <h1 class="form__title form__title_normweight">Enter the email or phone number that you specified during registration</h1>
                {{{ InputEmail }}}
                {{{ ButtonSubmit }}}
            </Form>
        `
    }
}
