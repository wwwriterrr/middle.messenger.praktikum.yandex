import Block from "../../core/Block";


export default class Attach extends Block{
    render() {
        return `
            <div class="message-attach__item"><img src="{{attach}}" alt=""></div>
        `
    }
}
