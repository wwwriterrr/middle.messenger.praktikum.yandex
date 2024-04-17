import Block from "../../core/Block";
import FormElement from "./form-element";

export default class FormWrapper extends Block {
    constructor(props: any) {
        super({
            ...props,
            FormElement: new FormElement({
                title: props.title,
                formBody: props.formBody,
                events: {submit: (e) =>
                    {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                }
            })
        });
    }

    render() {
        return (
            `<div class="page page_center">
                <div class="form__wrap">
                    {{{ FormElement }}}
                </div>
            </div>`
        )
    }
}