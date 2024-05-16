import Block from "../../core/Block";
import Attach from "./attach-component";


interface IProps{
    message: any,
    attach: any,
    AttachComponentsKeys?: [string]
}

export default class ChatMessage extends Block<IProps>{
    constructor(props: IProps) {
        if(props.attach.length != 0){
            const AttachComponents = props.attach.reduce((acc: { [key: string]: Block<object> }, data: string) => {
                //console.log(acc, data);
                const component = new Attach({attach: data});
                acc[component._id] = component;
                return acc;
            }, {});

            super({
                ...props,
                AttachComponentsKeys: Object.keys(AttachComponents),
                ...AttachComponents
            })
        }else{
            super(props);
        }
    }

    render() {
        return `
            <div class="message-container {{#if_eq message.sender 'self'}}message-container_self{{/if_eq}}">
                <div id="message-{{message.id}}" class="message {{#if_eq message.sender 'self'}}message_self{{/if_eq}}">
                    <div class="message__avatar"><img src="{{message.avatar}}" alt="{{message.sender}}"></div>
                    <div class="message__wrap">
                        <div class="message__head">
                            <div class="message__sender">{{#if_eq message.sender "self"}}Rocky{{else}}{{message.sender}}{{/if_eq}}</div>
                            <div class="message__date">{{message.date}}</div>
                        </div>
                        <div class="message__text">{{message.msg}}</div>
                    </div>
                </div>
                {{#if attach}}
                <div class="message-attach {{#if_eq message.sender 'self'}}message-attach_self{{/if_eq}}" data-message="{{message.id}}">
                    <div class="message-attach__wrap" data-length="{{attach.length}}">
                        ${this.props.AttachComponentsKeys && this.props.AttachComponentsKeys.map((key) => `{{{ ${key} }}}`).join('')}
                    </div>
                </div>
                {{/if}}
            </div>
        `
    }
}
