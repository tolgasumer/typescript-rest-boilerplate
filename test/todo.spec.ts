/*
'use strict';

import * as chai from 'chai';
import {after, before, describe, it} from 'mocha';
import * as request from 'request';
import {HttpMethod, Server} from 'typescript-rest';
import { ApiServer } from '../src/api-server';

const expect = chai.expect;

const apiServer: ApiServer = new ApiServer();
const baseRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>
                 = request.defaults({baseUrl: `http://localhost:${apiServer.PORT}`});

describe('Controller tests', () => {

    before(() => {
        return apiServer.start();
    });

    after(() => {
        return apiServer.stop();
    });

    describe('REST Server', () => {
        it('should provide a catalog containing the exposed paths', () => {
            expect(Server.getPaths()).to.include.members([
                '/todo/',
                '/todo/:id',
            ]);
            expect(Server.getHttpMethods('/todo/')).to.have.members([HttpMethod.GET, HttpMethod.POST]);
            expect(Server.getHttpMethods('/todo/:id')).to.have.members([HttpMethod.GET, HttpMethod.PUT]);
        });
    });

    describe('/todo/', () => {
        it('should return todo items for GET requests', (done) => {
            baseRequest('/todo/', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                expect(JSON.parse(body)).to.be.an.instanceOf(Array)
                done();
            });
        });

        it('should return 204 no content for id xxx for GET requests', (done) => {
            baseRequest('/todo/xxx', (error: any, response, body) => {
                expect(response.statusCode).to.eq(204);
                done();
            });
        });

        it('should return 404 for POST requests', (done) => {
            baseRequest.post({
                body: 'test',
                url: '/xxx'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(404);
                done();
            });
        });
    });

    describe('/todo/:id', () => {
        it('should return the todo item for GET requests', (done) => {
            baseRequest('/todo/99', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                expect(JSON.parse(body)).to.have.all.keys('id', 'name', 'desc', 'status');
                done();
            });
        });

        it('should return 204 no content for id xxx for GET requests', (done) => {
            baseRequest('/todo/xxx', (error: any, response, body) => {
                expect(response.statusCode).to.eq(204);
                done();
            });
        });

        it('should return 404 for POST requests', (done) => {
            baseRequest.post({
                body: 'test',
                url: '/todo/xxx'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(404);
                done();
            });
        });
    });
});
*/