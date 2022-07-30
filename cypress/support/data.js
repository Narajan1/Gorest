const helper = require("../support/helper");
const faker = require('@faker-js/faker').faker;

let userName = faker.name.firstName();
let userEmail = faker.internet.email();
let userGender = faker.name.gender(true);
let userStatus = "active";                    //helper.getStatus();


let updatedN = "Updated_name111" + Date.now();
let updatedE = "Updated_email" + Date.now() + "@gmail.com"

module.exports = {
    //token: Cypress.env("TOKEN"),
    token: "Bearer 5640c39ea5381bea7e66a0a269f1a74db4c53bc218e806b4e0115099c712ff3b",
    name: userName,
    email: userEmail,
    gender: userGender,
    status: userStatus,

    dataObj: {
            name: "Nara",
            email: "nara@mail.ru",
            gender: "female",
            status: "active"
    },

    updatedName: updatedN,
    updatedEmail: updatedE
}