import Block from "../../core/Block";
import isEqual from 'lodash/isEqual';


class ProfileErrorLine extends Block{
    constructor(props) {
        super(props);
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Profile Row Error Line props');
        return true;
    }

    render(): string {
        return `
            <div class="profile-row__error">{{error}}</div>
        `
    }
}

export default ProfileErrorLine;