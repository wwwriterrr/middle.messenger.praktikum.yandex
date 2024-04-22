import Block from "../../core/Block"
import { RememberPage, FormRemember } from "../../components/";


interface IProps {
    is_authenticated?: boolean,
}


export default class RememberPassword extends Block<IProps>{
    constructor(props: IProps) {
        super({
            ...props,
            RememberAuth: new RememberPage({}),
            RememberForm: new FormRemember({}),
        });
    }

    render() {
        return `
            <div class="page page_center">
                <div class="form__wrap">
                    {{#if is_authenticated}}
                    {{{ RememberAuth }}}
                    {{else}}
                    {{{ RememberForm }}}
                    {{/if}}
                </div>
            </div>
        `
    }
}
