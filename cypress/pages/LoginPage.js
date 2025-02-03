class LoginPage {
    visit() {
      cy.visit("/");
      cy.title().should("eq", "Document");
    }
  
    enterUsername(username) {
      cy.get('[placeholder="Enter Username"]').clear().type(username);
    }
  
    enterPassword(password) {
      cy.get('[placeholder="password"]').clear().type(password);
    }
  
    clickLogin() {
      cy.get('button[class="sc-bZQynM cGmBje"]').click();
    }

    pressEnterKey(){
      cy.get('button[class="sc-bZQynM cGmBje"]').trigger('keydown', { key: 'Enter' });
    }
  
    validLogin(username, password) {
      this.enterUsername(username);
      this.enterPassword(password);
      this.clickLogin();
    }
  
    invalidLogin(username, password) {
      this.enterUsername(username);
      this.enterPassword(password);
      this.pressEnterKey();
      
    }
  
    verifyLoginSuccess(userName) {
      cy.get(".sc-bdVaJa > div").should("have.text", `Hello ${userName || "undefined"}`);
    }
  
    verifyLoginFailure() {
      cy.contains("If you do not have an account, contact an admin").should("exist");
    }
  
    logout() {
      cy.get(".sc-bxivhb").click();
    }
  
    verifyLogout() {
      cy.contains("If you do not have an account, contact an admin").should("exist");
    }
  }
  
  export default new LoginPage();
  