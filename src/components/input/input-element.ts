import Block from "../../core/Block";
import ErrorLine from "./error-line";
import Input from "./input";
import isEqual from 'lodash/isEqual';


class InputElement extends Block {
    constructor(props: any) {
        super({
            ...props,
            Input: new Input({
                ...props,
                events: {
                    blur: props.onBlur || (() => {}),
                }
            }),
            ErrorLine: new ErrorLine({
                //error: props.error
            })
        })
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        //if(oldProps === newProps) {
        if(isEqual(oldProps, newProps)){
            return false;
        }

        console.log('Change Input Element props');
        this.children.Input.setProps(newProps);
        this.children.ErrorLine.setProps(newProps);
        return true;
    }

    render(): string {
        return `
                <div class="input {{#if error}}input_error{{/if}}">
                    <label class="input__container">
                        {{{ Input }}}
                        <div class="input__label">{{label}}</div>
                    </label>
                    {{{ ErrorLine }}}
                </div>
            `
    }
}

export default InputElement;
