import Block from "../../core/Block";


interface IProps{
    classes?: string,
    title: string,
    formBody: Block<object>
}

class FormElement extends Block<IProps> {
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
