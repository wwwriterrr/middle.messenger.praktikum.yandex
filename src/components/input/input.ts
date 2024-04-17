import Block from "../../core/Block";

class Input extends Block {
    constructor(props: {}) {
        super(props)
    }

    /*init(){
        const onInputBlurBind = this.onInputBlur.bind(this);
        this.setProps({events: {change: onInputBlurBind}})
    }

    onInputBlur(e) {
        const value = e.target.value;
        if(value !== '') this.setProps({classes: 'input__element_filled', value: value});
        else this.setProps({classes: '', value: value});
    }*/

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        console.log('Input update');
        return true;
    }

    render(): string {
        return `
            <input class="input__element {{classes}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" autocomplete="off" value="{{value}}" />
        `
    }
}

export default Input;