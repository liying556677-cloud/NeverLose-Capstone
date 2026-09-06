describe("Finder - Valid Tag Flow - Report", () => {
  const token = "test-valid-token";
  beforeEach(() => {
    // Mock data
    cy.intercept("GET", `**/items/${token}`, {
      body: {
        nickname: "Blue Wallet",
        verificationQuestion: "What is the brand of my wallet?",
      },
    }).as("getItem");

    cy.intercept("POST", `**/items/${token}/found`, { statusCode: 200 }).as(
      "sendReport",
    );
  });

  it("should navigate through all the steps and show success", () => {
    cy.visit(`f/${token}`);
    //waiting for API response
    cy.wait("@getItem");

    // Step 1 - landing
    cy.contains("Blue Wallet").should("be.visible");

    cy.contains("button", "Contact Owner").click();

    //Step 2 - security
    cy.contains("What is the brand of my wallet?").should("be.visible");
    cy.get("textarea").first().type("It is a Bellroy wallet");

    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/Evidence-wallet.jpg",
      { force: true },
    );

    cy.get("button").contains("Next").should("not.be.disabled").click();

    //Step 3 - Contact details
    cy.contains("Reach out to the owner").should("be.visible");
    cy.get('input[type="email"]').type("finderemail@example.com");
    cy.get("textarea").type(
      "I found your wallet near the park entrance. It's safe with me!",
    );
    cy.get('input[placeholder*="Central Park"]').type("Starbucks on 5th Ave");
    cy.get('input[placeholder="Name"]').type("Alex Finder");

    cy.contains("button", "Send Notification to Owner")
      .should("not.be.disabled")
      .click();

    // Step 4 - Success State
    cy.contains("You're a Hero!").should("be.visible");
    cy.contains("button", "Discover Neverlose").click();
    cy.url().should("include", "/home");
  });
});
