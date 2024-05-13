import Block from "../../core/Block";


interface IProps{
    error?: string
}

class ProfileErrorLine extends Block<IProps>{
    constructor(props: IProps) {
        super(props);
    }

    render(): string {
        return `
            <div class="profile-row__error">{{error}}</div>
        `
    }
}

export default ProfileErrorLine;
