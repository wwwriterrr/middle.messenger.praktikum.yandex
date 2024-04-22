import Block from "../../core/Block";
import isEqual from 'lodash/isEqual';

class Button extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                click: props.onClick
            },
            classes: props.classes,
            isLoading: props.isLoading,
        })
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Button props');
        return true;
    }

    render(): string {
        return `
            <button class="button button_{{type}}{{#if mode}} button_{{mode}}{{/if}}{{#if isLoading}} loading{{/if}}{{#if classes}} {{classes}}{{/if}}" {{#if_eq type "link"}}type="button"{{/if_eq}} {{#if page }}page="{{page}}"{{/if}} {{#if style}}style="{{style}}"{{/if}}>{{label}}</button>
        `
    }
}

export default Button;
