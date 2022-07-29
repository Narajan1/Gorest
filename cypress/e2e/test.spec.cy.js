/// <reference types="cypress" />
const helper = require("../support/helper");

describe("Gorest", () => {

    it("GET - Get all users", () => {
        let count;
        helper.getPagesCount();
        cy.get("@pagesCount").then(responce => {
            count = responce;
        })
        for (let i = 1; i <= count; i++) {
            helper.getAllUsersPerPage(i).its("body").should("not.be.empty");
        }
    })

    //Response Code 200
    it("GET - Get user by randome Id", () => {
        helper.getRandomId();
        cy.get("@userId").then(responce => {
            let userId = responce;
            helper.getUserById(userId).its("body.code").should("eq", 200);
        })
    })

    //Response Code 201
    it("POST - Create a user", () => {
        helper.postRequestRandomUsers().then(response => {
            expect(response.body.code).to.be.equal(201)
        }).then(responce => {
            let userId = responce.body.data.id;
            helper.getUserById(userId).then(responce => {
                expect(responce.body.data).has.property("id", userId);
            })

        })
    })

 
    it.only("PUT - Update user information", () => {
        helper.postRequestRandomUsers().then(responce => {
            expect(responce.body.code).to.be.equal(201)
        }).then(response => {
            let userId = response.body.data.id;
            helper.putRequestByUpdetedFields(userId).then(response => {
                expect(response.body.code).to.be.equal(200);
                expect(response.body.data).has.property("id", userId);
            })
        })
    })
})
