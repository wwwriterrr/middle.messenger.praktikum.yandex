import Block from "../../core/Block";
import isEqual from 'lodash/isEqual';


class ErrorLine extends Block {
    constructor(props: {}) {
        super(props);
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(isEqual(oldProps, newProps)) {
            return false;
        }

        console.log('Change Error Line props');
        return true;
    }

    render(): string {
        return (`
            <div class="input__error {{errorClasses}}">{{error}}</div>
        `)
    }
}

export default ErrorLine