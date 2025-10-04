const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 30000,
    responseTimeout: 60000,
    screenshotOnRunFailure: false,
    video: false,
    retries: {
      runMode: 2,
      openMode: 1
    }
  }
});
