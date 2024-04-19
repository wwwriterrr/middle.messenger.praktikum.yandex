import Block from "../../core/Block";
import { FormProfile } from "../../components";
import isEqual from 'lodash/isEqual';


export default class ProfilePage extends Block{
    constructor(props) {
        super({
            ...props,
            FormProfile: new FormProfile({})
        });
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Profile page props');
        return true;
    }

    render() {
        return `
            <div class="page__profile profile__wrap">
                <div class="avatar__wrap">
                    <div class="avatar__element {{#unless avatar }}avatar__element_notset{{/unless}}">
                        <img class="avatar__image" src="/public/av1.jpg" alt="User avatar">
                        <button class="avatar__button" page="Change Avatar"></button>
                    </div>
                </div>
                <div class="profile__name">{{nickname}}</div>
                {{{ FormProfile }}}
            </div>
        `
    }
}