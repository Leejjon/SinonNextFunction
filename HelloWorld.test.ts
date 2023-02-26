import * as sinon from 'sinon';
import {Response, Request} from 'express';

import {dynamicHelloWorld} from "./HelloWorld";

describe('Test hello world api', () => {
    let res: Partial<Response> = {
        contentType: sinon.stub(),
        status: sinon.stub(),
        send: sinon.stub()
    };

    let next = sinon.stub();

    afterEach(() => {
        sinon.restore();
    });

    it('Succesfully print Hello Leon', () => {
        let requestWithQueryParam: Partial<Request> = {query: { name: "Leon"} }
        dynamicHelloWorld(<Request> requestWithQueryParam, <Response> res, next);

        sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
        sinon.assert.calledWith(res.send as sinon.SinonStub, "Hello, Leon")
        sinon.assert.notCalled(next);
    });

    it('Query parameter is missing', () => {
        let requestWithQueryParam: Partial<Request> = {query: {} }
        dynamicHelloWorld(<Request> requestWithQueryParam, <Response> res, next);

        sinon.assert.notCalled(res.status as sinon.SinonStub);
        sinon.assert.notCalled(res.send as sinon.SinonStub);
        sinon.assert.called(next);
    });
});
