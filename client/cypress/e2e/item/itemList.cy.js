describe('NeverLose - Edit Item Flow', () => {

  beforeEach(() => {
    //  Always login first
    cy.visit('/login');
    cy.get('input[name="email"]').type('dhanashree.thakur@gmail.com');
    cy.get('input[name="password"]').type('NeverL0$e');
    cy.contains('Login').click();
    cy.contains('My Secure Tags').should('be.visible');
  });

  it('should successfully update the description of an existing item', () => {

    // Click item name to go to details
    cy.contains('Home Keys').click();

    // Click Edit button (pencil icon)
    cy.get('.btn.btn-edit.btn-link').first().click();

    // Verify edit page
    cy.contains('Edit Your Item').should('be.visible');

    // Update description
    const newDescription = 'my new ' + Date.now();

    cy.get('textarea[name="description"]')
      .clear()
      .type(newDescription);

    // Upload image
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/laptop.jpg', { force: true });

    cy.wait(2000); // reduce from 10s

    // Submit update
    cy.contains('Update Item').click();

    // Verify redirect
    cy.url().should('include', '/item-details');

    // Verify updated description
    cy.contains(newDescription).should('be.visible');

    // Ensure old placeholder gone
    cy.contains('No description provided').should('not.exist');
  });

});