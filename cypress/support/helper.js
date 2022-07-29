const faker = require("@faker-js/faker").faker;

let token = Cypress.env("TOKEN");

module.exports = {

    getAllUsers() {
        return cy.request({
            method: "GET",
            url: '/users',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    getAllUsersPerPage(index) {
        return cy.request({
            method: "GET",
            url: `/users?page=${index}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    getRandomId() {
        let randomId;
        this.getAllUsers().then(responce => {
            let numberOfUsersInPage = responce.body.data.length;
            cy.log(numberOfUsersInPage);
            let randomIndex = Math.floor(Math.random() * numberOfUsersInPage);
            cy.log(randomIndex);
            randomId = responce.body.data[randomIndex].id;
            cy.wrap(randomId).as("userId");
        })
    },

    getUserById(userId) {
        return cy.request({
            method: "GET",
            url: "/users/" + userId,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    postRequestRandomUsers() {
        return cy.request({
            method: "POST",
            url: "/users",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                name: this.generateRandomName() + "Nara",
                email: this.generateRandomEmail(),
                gender: this.generateRandomGender(),
                status: this.getStatus()
            }
        })
    },

    putRequestByUpdetedFields(userId) {
        return cy.request({
            method: "PUT",
            url: "/users/" + userId,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                "name": "Updated_name111" + Date.now(),
                "email": "Updated_email" + Date.now() + "@gmail.com",
                "gender": this.generateRandomGender(),
                "status": this.getStatus()
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

    generateRandomName() {
        return faker.name.firstName();
    },

    generateRandomEmail() {
        return this.generateRandomName() + Date.now() + "@gmail.com";
    },

    generateRandomGender() {
        return faker.name.gender(true);
    },

    getPagesCount() {
        this.getAllUsers().then(responce => {
            let pages = responce.body.meta.pagination.pages;
            cy.wrap(pages).as("pagesCount");
        })
    }
}
