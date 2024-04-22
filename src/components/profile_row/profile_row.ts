import Block from "../../core/Block";
import isEqual from 'lodash/isEqual';
import ProfileInput from "./input";
import ProfileErrorLine from "./error_line";


interface IProps{
    ProfileInput: Block<object>,
    ErrorLine: Block<object>,
    error?: string,
    label: string
}

class ProfileRow extends Block<IProps>{
    constructor(props: any) {
        super({
            ...props,
            ProfileInput: new ProfileInput({
                ...props,
                events: {
                    blur: props.onBlur || (() => {}),
                    //change: props.onChange || (() => {}),
                }
            }),
            ErrorLine: new ProfileErrorLine({
                ...props,
            })
        })
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)){
            return false;
        }

        console.log('Change Profile Row props');
        this.children.ProfileInput.setProps(newProps);
        this.children.ErrorLine.setProps(newProps);
        return true;
    }

    render(): string {
        return `
            <div class="profile-row {{#if error}}profile-row_invalid{{/if}}">
                <label class="profile-row__wrap">
                    <div class="profile-row__label">{{label}}</div>
                    {{{ ProfileInput }}}
                </label>
                {{{ ErrorLine }}}
            </div>
        `
    }
}

export default ProfileRow;
