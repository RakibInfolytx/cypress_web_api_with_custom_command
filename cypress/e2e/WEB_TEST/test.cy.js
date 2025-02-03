/// <reference types="Cypress" />
import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";
import account from "../../../storage/account.json";

describe("UI quiz test - Valid user Test", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("- Verify navigating to the right URL", () => {
    cy.get(".sc-bdVaJa > div").should("have.text", "qa.code-quiz.dev");
  });

  Object.keys(account).forEach((username) => {
    const user = account[username];

    it(`- Verify login for user: ${username}`, () => {
      cy.validLogin(username, user.password);
      LoginPage.verifyLoginSuccess(user.name);
    });

    it(`- Verify dashboard for user: ${username}`, () => {
      cy.validLogin(username, user.password);
      DashboardPage.verifyDashboard(user);
    });

    it(`- Verify logout for user: ${username}`, () => {
      cy.validLogin(username, user.password);
      LoginPage.logout();
      LoginPage.verifyLogout();
    });
  });
});

describe("UI quiz test - Invalid user Test", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("- Verify login with invalid username", () => {
    cy.invalidLogin("InvalidUser", "TopSecret1234!");
    LoginPage.verifyLoginFailure();
  });

  it("- Verify login with invalid password", () => {
    cy.invalidLogin("SomeUser_name", "WrongPassword");
    LoginPage.verifyLoginFailure();
  });

  it("- Verify login with empty username", () => {
    
    LoginPage.enterPassword("TopSecret1234!");
    LoginPage.pressEnterKey();
    LoginPage.verifyLoginFailure();
  });

  it("- Verify login with empty password", () => {
    LoginPage.enterUsername("SomeUser_name");

    LoginPage.pressEnterKey();
    LoginPage.verifyLoginFailure();
  });

  it("- Verify login with special characters in username", () => {
    LoginPage.invalidLogin("!@#$%^&*()", "TopSecret1234!");
    LoginPage.verifyLoginFailure();
  });

  it("- Verify login with very long username", () => {
    const longUsername = "a".repeat(256);
    LoginPage.invalidLogin(longUsername, "TopSecret1234!");
    LoginPage.verifyLoginFailure();
  });

  it("- Verify user is logged out automatically after logout", () => {
    LoginPage.validLogin("SomeUser_name", account.SomeUser_name.password);
    LoginPage.logout();
    LoginPage.verifyLogout();
  });
});
