import Block from "../../core/Block";


export default class MessageInput extends Block{
    constructor(props) {
        super({
            ...props,
            events: {
                blur: props.onBlur || (() => {}),
                input: props.onInput || (() => {})
            }
        });
    }

    render() {
        return `
            <input class="chat__message {{classes}}" type="{{#if type}}{{ type }}{{else}}text{{/if}}" name="{{ name }}" placeholder="{{ placeholder }}" spellcheck="false" value="{{value}}">
        `
    }
}
