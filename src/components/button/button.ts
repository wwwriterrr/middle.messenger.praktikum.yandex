import Block from "../../core/Block";

class Button extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                click: props.onClick
            },
            classes: props.classes,
        })
    }

    render(): string {
        return `
            <button class="button button_{{type}}{{#if mode}} button_{{mode}}{{/if}}{{#if classes}} {{classes}}{{/if}}" {{#if_eq type "link"}}type="button"{{/if_eq}} {{#if page }}page="{{page}}"{{/if}} {{#if style}}style="{{style}}"{{/if}}>{{label}}</button>
        `
    }
}

export default Button;