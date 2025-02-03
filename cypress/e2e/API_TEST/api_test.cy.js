
describe("User API Tests", () => {

  const apiBaseUrl = Cypress.config("apiUrl");
    
  const testUser = {
      username: "testUser123",
      name: "Test User",
      password: "securePass",
      favouriteFruit: "Mango",
      favouriteMovie: "Inception",
      favouriteNumber: 7
  };

  it("- Should return API response", () => {
      cy.request({
      method: "GET",
      url: `${apiBaseUrl}/`,
      failOnStatusCode: false
      }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include("Backend API");
    });

  });

  it("- Should create a new user", () => {
    cy.request({
        method: "POST",
        url: `${apiBaseUrl}/user`,
        body: testUser,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include("Account Created");
    });
  });

  it("- Should not allow to re-create of an existing user", () => {
    cy.request({
        method: "POST",
        url: `${apiBaseUrl}/user`,
        body: testUser,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include("Account Already Exists");
    });
  });

  it("- Should update existing user", () => {
    cy.request({
        method: "PUT",
        url: `${apiBaseUrl}/user`,
        qs: { username: testUser.username },
        body: {
            name: "Updated User",
            password: "newPass123",
            favouriteFruit: "Apple",
            favouriteMovie: "The Matrix",
            favouriteNumber: 10
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include("Account Updated");
    });
  });

  it("- Should return an error when updating a non-existent user", () => {
    cy.request({
        method: "PUT",
        url: `${apiBaseUrl}/user`,
        qs: { username: "NonExistentUser" },
        body: {
          name: "Updated User",
          password: "newPass123",
          favouriteFruit: "Apple",
          favouriteMovie: "The Matrix",
          favouriteNumber: 10
      },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include("Account Does NOT Exist");
    });
});

  it("- Should delete existing user", () => {
    cy.request({
      method: "DELETE",
      url: `${apiBaseUrl}/user`,
      qs: { username: testUser.username },
      failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include("Account Deleted");
    });
  });

  it("- Should return an error when deleting a non-existent user", () => {
      cy.request({
          method: "DELETE",
          url: `${apiBaseUrl}/user`,
          qs: { username: "NonExistentUser" },
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.include("Account Does Not Exist");
      });
  });
});
