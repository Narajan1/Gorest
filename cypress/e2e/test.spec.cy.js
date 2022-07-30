/// <reference types="cypress" />
const helper = require("../support/helper");
const data = require("../support/data");

describe("Gorest", () => {

    it("GET - Get all users", () => {
        let count;
        helper.getPagesCount();
        cy.get("@pagesCount").then(responce => {
            count = responce;
            for (let i = 1; i <= count; i++) {
                helper.getAllUsersPerPage(i).its("body").should("not.be.empty");
            }
        })

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
                expect(responce.body.data).has.property("name", data.name);
            })

        })
    })

    it("PUT - Update user information", () => {
        helper.postRequestRandomUsers().then(responce => {
            expect(responce.body.code).to.be.equal(201)
        }).then(response => {
            let userId = response.body.data.id;
            helper.putRequestByUpdetedFields(userId).then(responce => {
                expect(response.body.code).to.be.equal(201);
                expect(response.body.data).has.property("id", userId);
                expect(responce.body.data).has.property("name", data.updatedName);
                expect(responce.body.data).has.property("email", data.updatedEmail);
            })
        })
    })

    //Response Code 404
    it("GET - For 404", () => {
        helper.getUserById(9000).its("body.code").should("eq", 404);
    })


    //Response Code 422
    it("POST - For 422 code", () => {

        return cy.request({
            method: "POST",
            url: "/users",
            headers: {
                Authorization: data.token
            },
            body: data.dataObj
        }).then(responce => {
            expect(responce.body.code).to.equal(422);
        })
    })

    it.only("DELETE - Delete user by randome Id", () => {
        helper.postRequestRandomUsers().then(responce => {
            expect(responce.body.code).to.be.equal(201)
        }).then(response => {
            let userId = response.body.data.id;
            helper.deleteUser(userId).its("body.code").should("eq", 204);
        })
    })
})
