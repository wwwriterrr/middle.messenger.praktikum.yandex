import Block from "../../core/Block"


export default class RememberPage extends Block<any>{

    render() {
        return `
            <div class="rpassword__success">
                <img class="rpassword__success-img" src="/public/mail3.gif" alt="Link send to your email">
                <div class="rpassword__success-text">A link to recover your password has been sent to your email</div>
            </div>
        `
    }
}
