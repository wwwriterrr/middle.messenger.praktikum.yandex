import { expect } from "chai";
import sinon from 'sinon';
import {Button} from "./index.ts";
import Handlebars from 'handlebars';


describe('Button component', () => {
    before(() => {
        Handlebars.registerHelper('if_eq', function(a, b, opts) {
            const t: any = this;
            if (a == b) {
                return opts.fn(t);
            } else {
                return opts.inverse(t);
            }
        });
    })

    it('Правильно выставляется тип кнопки при заданном параметре type', () => {
        const btn = new Button({label: 'Test button', type: 'link'});
        const component = btn.getContent()!;

        const btnType = component.getAttribute('type');

        expect(btnType).to.eql('button');
    })

})