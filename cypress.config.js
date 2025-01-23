const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "https://front.serverest.dev/",
    apiUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
