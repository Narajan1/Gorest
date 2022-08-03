const dbName = 'stagingA';

module.exports = {

    myQuery(dbName, query) {
        return cy.task('queryDatabase', { dbName, query })
    },

    addUserToDB(id, name, email, gender, status) {
        const query = `INSERT INTO Users (UserID, UserName, Email, Gender, Status) VALUES (${id}, "${name}", "${email}", "${gender}", "${status}");`
        this.myQuery(dbName, query)
    },

    getUserFromDB(id) {
        const query = `SELECT * FROM Users WHERE UserID=${id};`
        return this.myQuery(dbName, query)
    },

    selectAllUsersFromDB() {
        const query = `SELECT * FROM Users;`
        return this.myQuery(dbName, query)
    },

    deleteUserFromDB(id) {
        const query = `DELETE FROM Users WHERE UserID=${id};`
        this.myQuery(dbName, query)
    },

    updateUserInDB(id) {
        const query = `UPDATE Users SET UserName=${Date.now()}  WHERE UserID=${id};`
        return this.myQuery(dbName, query)
    }
}
