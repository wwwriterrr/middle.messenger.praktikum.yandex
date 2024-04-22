import Block from "../../core/Block";


interface IProps{
    type: string,
    name: string,
    value: string
}

class ProfileInput extends Block<IProps>{
    constructor(props: IProps) {
        super(props)
    }

    render(): string {
        return `
            <input class="profile-row__input pprofile-row__input_{{type}}" name="{{name}}" type="{{type}}" value="{{value}}">
        `
    }
}

export default ProfileInput;
