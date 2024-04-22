import Block from "../../core/Block";


interface IProps{
    code?: number
}

export default class ErrorPage extends Block<IProps>{
    render() {
        return `
            <div class="error-page error error_{{code}}">
                <div class="error-page__wrap">
                    <div class="error-page__image-wrap">
                        <img class="error-page__image" src="/public/error.gif" alt="error {{code}}">
                    </div>
                    <div class="error-page__code">{{code}}</div>
                    <div class="error-page__text">
                        {{#if_eq code 404}}
                        We didn't find anything similar
                        {{else}}
                        We're already fixing IT
                        {{/if_eq}}
                    </div>
                </div>
            </div>
        `
    }
}
