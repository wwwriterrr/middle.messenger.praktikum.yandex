import Block from "../../core/Block";


type CIProps = {
    onChange: () => void,
}

export default class ChatAvatarInput extends Block<CIProps>{
    constructor(props: CIProps) {
        super({
            ...props,
            events: {
                change: props.onChange,
            }
        });
    }

    render() {
        return `
            <input type="file" name="chat-avatar" accept="image/jpeg, image/png" />
        `
    }
}
