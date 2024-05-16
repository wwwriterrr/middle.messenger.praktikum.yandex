//@ts-nocheck

import EventBus from "./EventBus";
import {nanoid} from 'nanoid';
import Handlebars from "handlebars";
import Validator from "../utils/validator";

export default class Block<Props extends object> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_CWU: "flow:component-will-unmount",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement | null = null;
    public id = nanoid(6);
    private _meta = null;
    public _id = nanoid(6);
    protected props: Props;
    //protected refs: Refs = {} as Refs;
    //public children: Block<object>[] = [];
    public children: any = [];
    private eventBus: () => EventBus;
    //private _eventbus;

    constructor(propsWithChildren = {}) {
        const eventBus = new EventBus();
        const {props, children} = this._getChildrenAndProps(propsWithChildren);
        this.props = this._makePropsProxy({ ...props });
        this.children = children;

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            //console.log('add event', eventName);
            this._element.addEventListener(eventName, events[eventName]);
        })
    }

    _removeEvents() {
        const {events = {}} = this.props;
        Object.keys(events).forEach(eventName => {
            //console.log('remove event', eventName);
            this._element.removeEventListener(eventName, events[eventName]);
        })
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    /*_createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }*/

    _init() {
        // this._createResources();
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    init() {

    }

    _componentDidMount() {
        /*this.componentDidMount();
        console.log('CDM')

        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });*/
        this._checkInDom();
        this.componentDidMount();
    }

    componentDidMount() {}

    _checkInDom() {
        const elementInDOM = document.body.contains(this._element);

        if (elementInDOM) {
            setTimeout(() => this._checkInDom(), 1000);
            return;

        }

        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

    _componentWillUnmount() {
        this._removeEvents();
        this.componentWillUnmount();
    }

    componentWillUnmount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    _componentDidUpdate(oldProps, newProps) {
        /*console.log('CDU', this.element, oldProps, newProps);
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
          return;
        }

        this._render();*/
        if (this.componentDidUpdate(oldProps, newProps)) {
            this._removeEvents();
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    _getChildrenAndProps(propsAndChildren) {
        const children: any = {};
        const props: any = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (value instanceof Block) {
                children[key] = value;
        } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const propsAndStubs = { ...this.props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });

        const childrenProps = [];
        Object.entries(propsAndStubs).forEach(([key, value]) => {
            if(Array.isArray(value)) {
                propsAndStubs[key] = value.map((item) => {
                    if(item instanceof Block) {
                        childrenProps.push(item)
                        return `<div data-id="${item._id}"></div>`
                    }

                    return item;
                }).join('')
            }
        });
        const fragment = this._createDocumentElement('template');

        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        const newElement = fragment.content.firstElementChild;

        [...Object.values(this.children), ...childrenProps].forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

            stub?.replaceWith(child.getContent());
        });


        if (this._element) {
            newElement.style.display = this._element.style.display
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();

        // const propsAndStubs = { ...this.props };
        //
        // Object.entries(this.children).forEach(([key, child]) => {
        //     propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        // });
        //
        // const fragment = this._createDocumentElement('template');
        //
        // fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        // const newElement = fragment.content.firstElementChild;
        //
        // Object.values(this.children).forEach(child => {
        //     const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        //
        //     stub?.replaceWith(child.getContent());
        // });
        //
        // if (this._element) {
        //     console.log('old', this._element, this._element.style.display);
        //     console.log('new', newElement.style.display);
        //     //newElement.style.display = this._element.style.display;
        //     this._element.replaceWith(newElement);
        // }
        //
        // this._element = newElement;
        //
        // this._addEvents();
    }

    render() {}

    getContent() {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this.element;
    }

    onInputBlur(e){
        const inputValue = e.target.value;
        const inputName = e.target.name;
        const props = {value: inputValue, error: null};
        let element = null;
        Object.keys(this.children).map(key => {
            if(this.children[key].props.name === inputName) element = this.children[key];
        })
        if(!element) throw new Error('Element name is lost');

        if( inputValue !== '' ) props.classes = 'input__element_filled';
        else{
            props.classes = '';
            element.setProps(props);
            return;
        }

        try{
            Validator(inputValue, inputName);
        } catch (error) {
            props.error = error.message;
            element.setProps(props);
            return;
        }

        element.setProps(props);

        return;
    }

    _makePropsProxy(props) {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = {...target}
                target[prop] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}
