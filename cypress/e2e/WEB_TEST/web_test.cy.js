/// <reference types="Cypress" />
import account from "../../../storage/account.json";

describe("UI quiz test- Valid user Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.title().should("eq", "Document");
  });

it("- Verify navigating to the right URL", () => {
  cy.get(".sc-bdVaJa > div").should("have.text", "qa.code-quiz.dev");
});

Object.keys(account).forEach((username) => {
  const user = account[username];

  it(`- Verify login for user: ${username}`, () => {
    cy.validLogin(username, user.password);
    cy.get(".sc-bdVaJa > div").should(
      "have.text",
      `Hello ${user.name || "undefined"}`
    );
  });

  it(`- Verify dashboard for user: ${username}`, () => {
    
    cy.validLogin(username, user.password);

    const displayName = user.name || username;

    if (!user.name) {
      cy.log(`Warning: User '${username}' has no name.`);
    }
    else{
    cy.get(".sc-bwzfXH > :nth-child(1) > :nth-child(2)").should("have.text", `${displayName}`);
    }

    cy.get(".sc-bwzfXH > :nth-child(2) > :nth-child(2)").should("have.text", user.favouriteFruit);
    cy.get(":nth-child(3) > :nth-child(2)").should("have.text", user.favouriteMovie);
    cy.get(":nth-child(4) > :nth-child(2)").should("have.text", user.favouriteNumber

    );
  });

  it(`- Verify logout for user: ${username}`, () => {
    cy.validLogin(username, user.password);
    cy.get(".sc-bxivhb").click();
    cy.get(".sc-bdVaJa > div").should("have.text", "qa.code-quiz.dev");
  });
});

});

describe("UI quiz test- Invalid user Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.title().should("eq", "Document");
  });

  it("- Verify login with invalid username", () => {
    cy.invalidLogin("InvalidUser", "TopSecret1234!");
    cy.contains('qa.code-quiz.dev').should('exist');
    cy.contains('If you do not have an account, contact an admin').should('exist');
    
  });

  it("- Verify login with invalid password", () => {
    cy.invalidLogin("SomeUser_name", "WrongPassword");
    cy.contains('If you do not have an account, contact an admin')
    .should('exist');
  });

  it("- Verify login with empty username", () => {
  
    cy.get('[placeholder="password"]').clear().type("TopSecret1234!");
    cy.get('button[class="sc-bZQynM cGmBje"]').trigger('keydown', { key: 'Enter' });
    cy.contains('If you do not have an account, contact an admin').should('exist');
  });

  it("- Verify login with empty password", () => {
   cy.get('[placeholder="Enter Username"]').clear().type('hh');
   cy.get('button[class="sc-bZQynM cGmBje"]').trigger('keydown', { key: 'Enter' });
   cy.contains('If you do not have an account, contact an admin').should('exist');
  });

  it("- Verify login with special characters in username", () => {
    cy.invalidLogin("!@#$%^&*()", "TopSecret1234!");
    cy.contains('If you do not have an account, contact an admin').should('exist');
    
  });

  it("- Verify login with very long username", () => {
    const longUsername = "a".repeat(256);
    cy.invalidLogin(longUsername, "TopSecret1234!");
    cy.contains('If you do not have an account, contact an admin').should('exist');
  });

  it("- Verify user is logged out automatically after logout", () => {
    cy.validLogin("SomeUser_name", account.SomeUser_name.password);
    cy.get(".sc-bxivhb").click();
    cy.contains('If you do not have an account, contact an admin').should('exist');
  });
});