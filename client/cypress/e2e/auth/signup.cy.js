describe("Signup Flow", () => {
  it("allows a user to sign up", () => {
    cy.visit("/signup");

    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type(`test${Date.now()}@example.com`);
    cy.get('input[name="password"]').type("Password123!");
    cy.get('input[name="confirmPassword"]').type("Password123!");

    cy.contains("Sign Up").click();

    // Expect redirect or success message
    cy.url().should("include", "/login");
    cy.contains("Welcome").should("exist");
  });
});