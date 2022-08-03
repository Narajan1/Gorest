const data = require("../support/data");
const queries = require("../support/queries");

module.exports = {

    getUsers() {
        return cy.request({
            method: "GET",
            url: '/users',
            headers: {
                Authorization: "Bearer " + data.token
            }
        })
    },

    getAllUsers() {
        this.getPagesCount();
        cy.get("@pagesCount").then(responce => {
            for (let i = 1; i <= responce; i++) {
                this.getAllUsersPerPage(i).its("body").should("not.be.empty");
            }
        })
    },

    getAllUsersPerPage(index) {
        return cy.request({
            method: "GET",
            url: `/users?page=${index}`,
            headers: {
                Authorization: "Bearer " + data.token
            }
        })
    },

    getRandomId() {
        let randomId;
        this.getUsers().then(responce => {
            let numberOfUsersInPage = responce.body.data.length;
            let randomIndex = Math.floor(Math.random() * numberOfUsersInPage);
            randomId = responce.body.data[randomIndex].id;
            cy.wrap(randomId).as("userId");
        })
    },

    getUserById(userId) {
        return cy.request({
            method: "GET",
            url: "/users/" + userId,
            headers: {
                Authorization: "Bearer " + data.token
            }
        })
    },

    postRequestRandomUsers() {
        return cy.request({
            method: "POST",
            url: "/users",
            headers: {
                Authorization: "Bearer " + data.token
            },
            body: {
                name: data.name,
                email: data.email,
                gender: data.gender,
                status: data.status
            }
        })
    },

    putRequestByUpdetedFields(userId) {
        return cy.request({
            method: "PUT",
            url: "/users/" + userId,
            headers: {
                Authorization: "Bearer " + data.token
            },
            body: {
                "name": data.updatedName,
                "email": data.updatedEmail,
                "gender": data.gender,
                "status": data.status
            }
        })
    },

    deleteUser(userId) {
        return cy.request({
            method: "DELETE",
            url: "/users/" + userId,
            headers: {
                Authorization: "Bearer " + data.token
            }
        })
    },

    getStatus() {
        let status = Math.round(Math.random());
        if (status === 0) {
            return "active";
        } else {
            return "inactive";
        }
    },

    getPagesCount() {
        this.getUsers().then(responce => {
            let pages = responce.body.meta.pagination.pages;
            cy.wrap(pages).as("pagesCount");
        })
    },

    getAddedUsersId() {
        queries.selectAllUsersFromDB().then(result => {
            let numberOfUsersInTable = result.length;
            let randomIndex = Math.floor(Math.random() * numberOfUsersInTable)
            cy.wrap(result[randomIndex].UserID).as("userIdFromTable")
        })
    }
}
