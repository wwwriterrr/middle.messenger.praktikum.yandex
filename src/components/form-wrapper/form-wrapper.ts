import Block from "../../core/Block";
import FormElement from "./form-element";
import isEqual from 'lodash/isEqual';


export default class FormWrapper extends Block {
    constructor(props: any) {
        super({
            ...props,
            FormElement: new FormElement({
                title: props.title,
                formBody: props.formBody,
                classes: props.classes,
                events: {submit: (e) =>
                    {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                }
            })
        });
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Form Wrapper props');
        return true;
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