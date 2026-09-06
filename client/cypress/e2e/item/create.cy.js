describe('Create Item Flow - NeverLose', () => {

  beforeEach(() => {
    cy.visit('/dashboard'); // assuming user already logged in
  });

  it('should create a new item successfully', () => {

    // Click Add New Item
    cy.contains('Add New Item').click();

    // Verify navigation
    cy.url().should('include', '/create-item');

    // Step 1: Fill form
   cy.contains('Item Nickname')
  .parent()
  .find('input')
  .type('Test Item Cypress Backpack');
    cy.get('textarea').type('This is a test item created by Cypress- backpack');

    // Upload image (mock file)
    cy.get('input[type="file"]').selectFile('cypress/fixtures/backpack.jpeg', { force: true });
    cy.log('Pausing for 20 seconds to inspect the uploaded image...');
    cy.wait(10000);

    // Click Next
    cy.contains('Next').click();

    // Step 2 (Assumption - update if needed)
    cy.contains('Review & Create').click();

    // Step 3 - Submit
    cy.contains('Create Item').click();

    // Assertion
    //cy.contains('Item created successfully').should('be.visible');

    // Redirect to dashboard
    cy.url().should('include', '/item-details');

    // Verify item exists
    cy.contains('Test Item Cypress').should('be.visible');
  });
});