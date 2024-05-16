import Block from "../../core/Block";


type AvatarProps = {
    onChange?: () => void,
}

class AvatarInput extends Block {
    constructor(props: AvatarProps) {
        super({
            ...props,
            events: {
                change: props.onChange
            },
        })
    }

    render(): string {
        return `
            <input class="avatar-form__input" type="file" name="avatar" accept="image/jpeg, image/png, image/jpg">
        `
    }
}

export default AvatarInput;
