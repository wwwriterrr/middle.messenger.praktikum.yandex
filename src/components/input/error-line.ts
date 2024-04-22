import Block from "../../core/Block";


interface IProps{
    errorClasses?: string,
    error?: string
}

class ErrorLine extends Block<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render(): string {
        return (`
            <div class="input__error {{errorClasses}}">{{error}}</div>
        `)
    }
}

export default ErrorLine
