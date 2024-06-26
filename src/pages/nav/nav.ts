import Block from "../../core/Block";


interface IProps{
    pages: string[]
}

export default class NavigatePage extends Block<IProps>{
    render() {
        return `
            <div class="page__nav">
                <div class="nav">
                    <div class="nav__logo-wrap">
                        <img class="nav__logo" src="/public/wm.svg" alt="">
                    </div>
                    <h1 class="nav__title">Hello World!</h1>
                    <nav class="nav__list-wrap">
                        <ul class="nav__list">
                            {{#each pages }}
                            <li class="nav__list-li"><a class="nav__list-a" href="#" page="{{this}}">{{this}}</a></li>
                            {{/each}}
                        </ul>
                    </nav>
                </div>
            </div>
        `
    }
}