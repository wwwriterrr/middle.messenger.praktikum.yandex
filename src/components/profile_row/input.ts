import Block from "../../core/Block";
import isEqual from 'lodash/isEqual';


class ProfileInput extends Block{
    constructor(props: {}) {
        super(props)
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Profile Input props');
        return true;
    }

    render(): string {
        return `
            <input class="profile-row__input pprofile-row__input_{{type}}" name="{{name}}" type="{{type}}" value="{{value}}">
        `
    }
}

export default ProfileInput;
