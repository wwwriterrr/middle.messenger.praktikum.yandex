import Block from "../../core/Block";


interface IProps{
    attach: string
}

export default class Attach extends Block<IProps>{
    render() {
        return `
            <div class="message-attach__item"><img src="{{attach}}" alt=""></div>
        `
    }
}
