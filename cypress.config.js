const { defineConfig } = require("cypress");
const mysql = require('mysql');

const connections = {
  stagingA: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Gorest'
  },
}

function queryDB(connectionInfo, query) {
  const connection = mysql.createConnection(connectionInfo)

  connection.connect()

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }
      connection.end()

      return resolve(results)
    })
  })
}


module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    baseUrl: 'https://gorest.co.in/public-api',
    watchForFileChanges: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on('task', {
        // destructure the argument into the individual fields
        queryDatabase({ dbName, query }) {
          const connectionInfo = connections[dbName]

          if (!connectionInfo) {
            throw new Error(`Do not have DB connection under name ${dbName}`)
          }

          return queryDB(connectionInfo, query)
        },
      })
    }
  }
})


