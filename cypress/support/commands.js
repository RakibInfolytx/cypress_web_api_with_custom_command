// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("validLogin", (username, password) => {
  cy.get('[placeholder="Enter Username"]').clear().type(username);
  cy.get('[placeholder="password"]').clear().type(password);
  cy.get('button[class="sc-bZQynM cGmBje"]').click();
});


Cypress.Commands.add("invalidLogin", (username, password) => {
    cy.get('[placeholder="Enter Username"]').clear().type(username);
    cy.get('[placeholder="password"]').clear().type(password);
    cy.get('button[class="sc-bZQynM cGmBje"]').trigger('keydown', { key: 'Enter' });
  });



