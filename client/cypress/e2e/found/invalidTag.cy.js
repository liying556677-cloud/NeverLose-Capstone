describe("Finder - Not Found / Inactive Tag Flow", () => {
  const invalidToken = "expired-or-fake-token";

  beforeEach(() => {
    // Mock data Response 404 - tag does not exist or is not active
    cy.intercept("GET", `**/items/${invalidToken}`, {
      statusCode: 404,
      body: { message: "Item not found" },
    }).as("getInvalidItem");
  });

  it("should show an error state when the tag is invalid and allow navigation back", () => {
    cy.visit(`f/${invalidToken}`);
    //waiting for fail API response
    cy.wait("@getInvalidItem");

    cy.get(".animate__animated.animate__fadeIn").should("be.visible");

    cy.contains("h2", "Oops! We couldn't find this page")
      .should("be.visible")
      .and("have.css", "color", "rgb(5, 21, 51)"); // var(--nl-deep-blue) Neverlose brand identity color

    cy.get(".bi-question-circle") //default icon
      .should("be.visible")
      .and("have.css", "color", "rgb(138, 225, 234)"); // var(--nl-info) Neverlose brand identity color

    // Neverlose summary
    cy.contains("Neverlose is a community platform").should("be.visible");

    // CTA
    cy.get("button").contains("Explore Neverlose").should("be.visible");
    cy.get("button").contains("Explore Neverlose").click();
    cy.url().should("include", "/home");
  });
});
