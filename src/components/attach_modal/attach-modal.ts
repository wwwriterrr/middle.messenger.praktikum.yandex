import Block from "../../core/Block";
import Button from "../button/button";


interface IProps{
    ButtonPhoto: Block<object>,
    ButtonFile: Block<object>,
    ButtonLocation: Block<object>,
}

export default class AttachModal extends Block<IProps>{
    constructor(props: IProps) {
        super(props);
    }

    init() {
        const ButtonPhoto = new Button({label: 'Photo or Video', classes: 'button_nofill button_normweight button_photo'});
        const ButtonFile = new Button({label: 'File', classes: 'button_nofill button_normweight button_file'});
        const ButtonLocation = new Button({label: 'Location', classes: 'button_nofill button_normweight button_location'});

        this.children = {
            ...this.children,
            ButtonPhoto,
            ButtonFile,
            ButtonLocation
        }
    }

    render() {
        return `
            <div class="attach-modal">
                {{{ ButtonPhoto }}}
                {{{ ButtonFile }}}
                {{{ ButtonLocation }}}
            </div>
        `
    }
}
