class DashboardPage {
    verifyDashboard(user) {
      const displayName = user.name || user.username;
      
      if (!user.name) {
        cy.log(`Warning: User '${user.username}' has no name.`);
      } else {
        cy.get(".sc-bwzfXH > :nth-child(1) > :nth-child(2)").should("have.text", `${displayName}`);
      }
  
      cy.get(".sc-bwzfXH > :nth-child(2) > :nth-child(2)").should("have.text", user.favouriteFruit);
      cy.get(":nth-child(3) > :nth-child(2)").should("have.text", user.favouriteMovie);
      cy.get(":nth-child(4) > :nth-child(2)").should("have.text", user.favouriteNumber);
    }
  }
  
  export default new DashboardPage();
  