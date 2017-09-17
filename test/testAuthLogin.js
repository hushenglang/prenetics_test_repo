/**
 * test auth related api: login
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

var supertest = require('supertest');
const expect = require('chai').expect;


var app = require('../server.js');
var request=supertest(app);

describe("Authentication Testing", function() {

    describe("Login Testing", function(){
        const loginApi = "/auth/login";

        it("Login success, return token", function(done){
            const email = "hushenglang@gmail.com";
            const password = "123456";
            request.post(loginApi)
                .send({
                    email: email,
                    password: password
                })
                .expect(200)
                .expect(function(response){
                    expect(response.body.data).a("string");
                    expect(response.body.success).eql(true);
                })
                .end(function(err, res) {
                    done(err);
                });

        });

        it("Login fail, return success false", function(done){
            const email = "xxxxxx@gmail.com";
            const password = "123456";
            request.post(loginApi)
                .send({
                    email: email,
                    password: password
                })
                .expect(200)
                .expect(function(response){
                    expect(response.body.success).eql(false);
                })
                .end(function(err, res) {
                    done(err);
                });

        });

    })
});
