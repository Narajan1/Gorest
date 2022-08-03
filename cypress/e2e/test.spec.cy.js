/// <reference types="cypress" />
const helper = require("../support/helper");
const data = require("../support/data");
const queries = require("../support/queries");

describe("Gorest", () => {

    //Please don't run, it will take a lot of time, but works perfectly
    it.skip("GET - Get all users", () => {
        helper.getAllUsers();
    })

    //Response Code 201
    it("POST - Create a user and input into database", () => {
        helper.postRequestRandomUsers().then(response => {
            expect(response.body.code).to.be.equal(201)
        }).then(responce => {
            let userId = responce.body.data.id;
            helper.getUserById(userId).then(responce => {
                expect(responce.body.data).has.property("id", userId);
                expect(responce.body.data).has.property("name", data.name);
            }).then(responce => {
                let user = responce.body.data;
                queries.addUserToDB(user.id, user.name, user.email, user.gender, user.status)
            }).then(result => {
                expect(result.affectedRows).to.equal(1);
            })
        })
    })

    //Response Code 200
    it("GET - Get user by randome Id", () => {
        helper.getRandomId();
        cy.get("@userId").then(responce => {
            helper.getUserById(responce).its("body.code").should("eq", 200);
        })
    })

    it("PUT - Update user information", () => {
        helper.getRandomId();
        cy.get("@userId").then(responce => {
            let userID = responce;
            helper.putRequestByUpdetedFields(userID).then(resp => {
                expect(resp.body.code).to.be.equal(200);
                expect(resp.body.data).has.property("id", userID);
                expect(resp.body.data).has.property("name", data.updatedName);
                expect(resp.body.data).has.property("email", data.updatedEmail);
            })
        })
    })

    it("Get, Update and Delete user from database", () => {
        helper.getAddedUsersId();
        cy.get("@userIdFromTable").then(id => {
            let userID = id;
            queries.getUserFromDB(userID);
            queries.updateUserInDB(userID).then(result => {
                expect(result.changedRows).to.equal(1);
            })
            queries.deleteUserFromDB(userID)
        })
    })

    //Response Code 204
    it("DELETE - Delete user by randome Id", () => {
        helper.getRandomId();
        cy.get("@userId").then(responce => {
            helper.deleteUser(responce).its("body.code").should("eq", 204);
        })
    })

    //Response Code 400
    it.skip("GET - For 400 code", () => {
        return cy.request({
            method: "GET",
            url: "/users/hello",
            headers: {
                Authorization: "Bearer " + data.token
            },
        }).then(responce => {
            expect(responce.body.code).to.equal(400);
        })
    })

    //Response Code 401
    it("POST - For 401 code", () => {
        return cy.request({
            method: "POST",
            url: "/users/",
            headers: {
                Authorization: "Bearer"
            },
            body: data.dataObj
        }).then(responce => {
            expect(responce.body.code).to.equal(401);
        })
    })

    //Response Code 404
    it("GET - For 404", () => {
        helper.getUserById(90000).its("body.code").should("eq", 404);
    })

    
    //Response Code 422
    it("POST - For 422 code", () => {

        return cy.request({
            method: "POST",
            url: "/users",
            headers: {
                Authorization: "Bearer " + data.token
            },
            body: data.dataObj
        }).then(responce => {
            expect(responce.body.code).to.equal(422);
        })
    })
})
