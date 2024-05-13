import Block from "../../core/Block";


interface IProps{
    classes?: string,
    name: string,
    type?: string,
    placeholder?: string,
    value?: string
}

class Input extends Block<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    render(): string {
        return `
            <input class="input__element {{classes}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" autocomplete="off" value="{{value}}" />
        `
    }
}

export default Input;
