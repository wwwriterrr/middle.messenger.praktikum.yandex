import Block from "../../core/Block";


class FormElement extends Block {
    constructor(props: any) {
        super(props);
    }

    render(): string {
        return `
            <form class="form {{classes}}">
                <h1 class="form__title">{{title}}</h1>
                {{{ formBody }}}
            </form>
        `
    }
}

export default FormElement;