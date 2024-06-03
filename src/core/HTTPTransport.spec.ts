import { expect } from "chai";
import sinon from 'sinon';
import { HTTPTransport, HOST, METHOD } from "./HTTPTransport";


describe('HTTPTransport', () => {
    afterEach(() => {
        sinon.restore();
    })
    it('Отрабатывает функция рендеринга HTTPTransport', async () => {
        const http = new HTTPTransport('/chats');
        const requestStub = sinon.stub(http, 'request').resolves();

        await http.get('', {data: { a: 'aaa', b: 'bbb' }});

        const expectedUrl = `${HOST}/chats?a=aaa&b=bbb`;

        expect(requestStub.calledWithMatch(expectedUrl, {method: METHOD.GET})).to.be.true;
    })
})
