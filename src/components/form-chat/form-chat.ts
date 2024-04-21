import Block from "../../core/Block";


export default class ChatForm extends Block{
    constructor(props) {
        super({
            ...props,
            events: {
                submit: (e) => { e.preventDefault();e.stopImmediatePropagation(); }
            }
        });
    }

    render() {
        return `
            <form class="chat__form">
                <div class="chat__form-avatar-wrap"><img class="chat__form-avatar" src="/public/av1.jpg" alt=""></div>
                <button class="chat__form-attach-btn" type="button"></button>
                <input class="chat__message" type="text" name="message" placeholder="Your message" spellcheck="false">
                <button class="chat__form-submit" type="submit"></button>
            </form>
        `
    }
}