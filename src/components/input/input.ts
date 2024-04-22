import Block from "../../core/Block";
//import * as events from "events";
import isEqual from 'lodash/isEqual';

class Input extends Block {
    constructor(props: {}) {
        super(props)
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Input props');
        return true;
    }

    render(): string {
        return `
            <input class="input__element {{classes}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" autocomplete="off" value="{{value}}" />
        `
    }
}

export default Input;
