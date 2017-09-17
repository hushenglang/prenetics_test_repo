/**
 * test account related api: login
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

var request = require('./testBase').requestHelp;
const expect = require('chai').expect;

describe("Account Testing", function() {
    describe("Account profile retrival testing", function(){

        it("Retrive account profile, return profile object", function(done){
            const profileApi = "/api/account/profile";
            const token = "Bearer "+request.authToken;
            request
                .get(profileApi)
                .set('Authorization', token)
                .expect(200)
                .expect(function(response){
                    expect(response.body.data).a("object");
                    expect(response.body.success).eql(true);
                })
                .end(function(err, res) {
                    done(err);
                });

        });

        it("Retrive genetic result, return result object", function(done){
            const geneticResultApi = "/api/account/genetic_results";
            const token = "Bearer "+request.authToken;
            request
                .get(geneticResultApi)
                .set('Authorization', token)
                .expect(200)
                .expect(function(response){
                    expect(response.body.data).a("array");
                    expect(response.body.success).eql(true);
                })
                .end(function(err, res) {
                    done(err);
                });

        });
    })
});
