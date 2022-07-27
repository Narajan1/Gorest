const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://gorest.co.in/public-api',
    watchForFileChanges: false,
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      
    },
  },
});
