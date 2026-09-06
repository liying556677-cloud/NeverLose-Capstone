describe("Login Flow", () => {
  it("logs in an existing user", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("dhanashree.thakur@gmail.com");
    cy.get('input[name="password"]').type("NeverL0$e");

    cy.contains("Login").click();

    
    cy.contains("My Secure Tags").should("exist");
  });
});