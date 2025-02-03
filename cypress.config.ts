import { defineConfig } from "cypress";
import mochawesome from "cypress-mochawesome-reporter/plugin";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    apiUrl: "http://localhost:9999",

    reporter: "cypress-mochawesome-reporter", 
    setupNodeEvents(on, config) {
      mochawesome(on); 
      return config;
    },
    reporterOptions: {
      reportDir: "cypress/reports/mocha", 
      overwrite: false,
      html: false, 
      json: true
    }
  }
});
