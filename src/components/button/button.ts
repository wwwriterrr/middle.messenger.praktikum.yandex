import Block from "../../core/Block";


interface IProps {
    type?: string,
    label?: string,
    isLoading?: boolean,
    classes?: string,
    page?: string,
    style?: string,
    mode?: string,
    onClick?: () => void
}

class Button extends Block<IProps> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: props.onClick
            },
            classes: props.classes,
            isLoading: props.isLoading,
        })
    }

    render(): string {
        return `
            <button class="button button_{{type}}{{#if mode}} button_{{mode}}{{/if}}{{#if isLoading}} loading{{/if}}{{#if classes}} {{classes}}{{/if}}" {{#if_eq type "link"}}type="button"{{/if_eq}} {{#if page }}page="{{page}}"{{/if}} {{#if style}}style="{{style}}"{{/if}}>{{label}}</button>
        `
    }
}

export default Button;
