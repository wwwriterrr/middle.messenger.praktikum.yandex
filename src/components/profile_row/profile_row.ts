import Block from "../../core/Block";
import isEqual from 'lodash/isEqual';
import ProfileInput from "./input";
import ProfileErrorLine from "./error_line";


class ProfileRow extends Block{
    constructor(props: any) {
        super({
            ...props,
            ProfileInput: new ProfileInput({
                ...props,
                events: {
                    blur: props.onBlur || (() => {}),
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

        console.log('Change Input Element props');
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