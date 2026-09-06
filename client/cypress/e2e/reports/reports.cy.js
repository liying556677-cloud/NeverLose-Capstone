describe('Secure Tags - Found Reports Flow', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display list of secure tags', () => {
    cy.contains('My Secure Tags').should('be.visible');

    // Verify table headers
    cy.contains('Item Nickname').should('be.visible');
    cy.contains('Item Status').should('be.visible');
    cy.contains('Last Activity').should('be.visible');

    // Verify at least one item exists
    cy.contains('Camera Leica Q2 Camera').should('be.visible');
  });

 
  it('should navigate to Found Report details page', () => {
    // Click first report icon (adjust selector if needed)
     cy.contains('music instrument')
      .parents('tr') // go up to the row
      .within(() => {
        // Click the report icon inside this row
         cy.get('button') // adjust based on your icon element
      .last()
      .click();
      });

    // Verify navigation
    cy.url().should('include', '/item-reports');

    // Validate report page content
    cy.contains('Found Reports').should('be.visible');
    cy.wait(5000);
    cy.get('.btn.manage-btn.w-100.fw-bold').first().click();

    // Verify discovery details
    cy.contains('Discovery Details').should('be.visible');
    cy.contains('Found Location').should('exist');
    cy.contains('Security Match').should('exist');
    cy.contains('Message').should('exist');

    // Verify finder contact
    cy.contains('Finder Contact').should('be.visible');
    cy.contains('Email Address').should('exist');

    // Verify recovery progress section
    cy.contains('Recovery Progress').should('be.visible');
    cy.contains('Contacted').should('be.visible');
  });

  

});