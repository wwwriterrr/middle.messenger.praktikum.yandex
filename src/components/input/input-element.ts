import Block from "../../core/Block";
import ErrorLine from "./error-line";
import Input from "./input";


class InputElement extends Block {
    constructor(props: any) {
        super({
            ...props,
            Input: new Input({
                events: {
                    blur: props.onBlur || (() => {}),
                },
                type: props.type,
                name: props.name,
                value: props.value
            }),
            ErrorLine: new ErrorLine({
                error: props.error
            })
        })
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        console.log('Input Element update');

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