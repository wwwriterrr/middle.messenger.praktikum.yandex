import Block from "../../core/Block";


class ErrorLine extends Block {
    render(): string {
        return (`
            <div class="input__error">{{error}}</div>
        `)
    }
}

export default ErrorLine