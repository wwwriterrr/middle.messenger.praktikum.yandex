import Block from "../../core/Block";
import FormElement from "./form-element";


interface IProps{
    FormElement?: Block<object>,
    title?: string,
    formBody?: Block<object>,
    classes?: string,
}

export default class FormWrapper extends Block<IProps> {
    constructor(props: IProps) {
        super({
            ...props,
            FormElement: new FormElement({
                title: props.title,
                formBody: props.formBody,
                classes: props.classes,
                events: {submit: (e: Event) =>
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
