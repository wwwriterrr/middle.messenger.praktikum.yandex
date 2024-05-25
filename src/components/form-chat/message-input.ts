import Block from "../../core/Block";


interface IProps{
    onBlur?: () => void,
    onInput?: () => void,
    onKeyDown?: () => void,
    classes?: string,
    type?: string,
    name: string,
    placeholder?: string,
    value?: string
}

export default class MessageInput extends Block <IProps>{
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                blur: props.onBlur || (() => {}),
                input: props.onInput || (() => {}),
                keydown: props.onKeyDown || (() => {}),
            }
        });
    }

    render() {
        return `
            <input class="chat__message {{classes}}" type="{{#if type}}{{ type }}{{else}}text{{/if}}" name="{{ name }}" placeholder="{{ placeholder }}" spellcheck="false" value="{{value}}">
        `
    }
}
