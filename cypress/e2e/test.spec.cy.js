/// <reference types="cypress" />
const helper = require("../support/helper");

describe("Gorest", () => {

    it("Get all users", () => {
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
    it("Get user by randome Id", () => {
        helper.getRandomId();
        cy.get("@userId").then(responce => {
            let userId = responce;
            helper.getUserById(userId).its("body.code").should("eq", 200);
        })
    })

    //Response Code 201
    it("Create a user", () => {
        helper.postRequestRandomUsers().then(response => {
            expect(response.body.code).to.be.equal(201)
        }).then(responce => {
            let userId = responce.body.data.id;
            helper.getUserById(userId).then(responce => {
                expect(responce.body.data).has.property("id", userId);
            })

        })
    })
})
