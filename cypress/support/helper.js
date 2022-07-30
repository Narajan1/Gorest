const data = require("../support/data");

module.exports = {

    getAllUsers() {
        return cy.request({
            method: "GET",
            url: '/users',
            headers: {
                Authorization: data.token
            }
        })
    },

    getAllUsersPerPage(index) {
        return cy.request({
            method: "GET",
            url: `/users?page=${index}`,
            headers: {
                Authorization: data.token
            }
        })
    },

    getRandomId() {
        let randomId;
        this.getAllUsers().then(responce => {
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
                Authorization: data.token
            }
        })
    },

    postRequestRandomUsers() {
        return cy.request({
            method: "POST",
            url: "/users",
            headers: {
                Authorization: data.token
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
                Authorization: data.token
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
                Authorization: data.token
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
        this.getAllUsers().then(responce => {
            let pages = responce.body.meta.pagination.pages;
            cy.wrap(pages).as("pagesCount");
        })
    }
}
