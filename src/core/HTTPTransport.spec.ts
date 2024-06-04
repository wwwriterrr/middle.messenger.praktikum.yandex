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

        const requestData: any = {data: {a: 'aaa', b: 'bbb'}};
        await http.get('', requestData);

        const expectedUrl = `${HOST}/chats?a=aaa&b=bbb`;

        expect(requestStub.calledWithMatch(expectedUrl, {method: METHOD.GET})).to.be.true;
    })
})
