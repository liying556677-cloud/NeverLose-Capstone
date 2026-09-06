
describe('NeverLose - Item Details + Label Screen Flow', () => {

  beforeEach(() => {
    // Login
    cy.visit('/login');
    cy.get('input[name="email"]').type('dhanashree.thakur@gmail.com');
    cy.get('input[name="password"]').type('NeverL0$e');
    cy.contains('Login').click();

    // Ensure dashboard loads
    cy.contains('My Secure Tags').should('be.visible');
  });

  it('should open item details and verify label screen', () => {
    //Open Item Details
    cy.contains('Home Keys')
      .should('exist')
      .click();

    cy.url().should('include', '/item-details');

    //  Verify Item Details
    cy.contains('Item Details').should('be.visible');

    cy.contains('Home Keys').should('be.visible');

    cy.get('img').should('exist');

    cy.contains('Home Keys').should('exist');

    cy.contains(/security question/i).should('exist');
    // Scroll to Label Section
    cy.contains('Download Your QR Code')
      .scrollIntoView()
      .should('be.visible');
    // Verify Label Cards
    cy.contains('Wallet Size').should('be.visible');
    cy.contains('AirTag Size').should('be.visible');
    cy.contains('Small Tag Size').should('be.visible');
    cy.contains('Custom Size').should('be.visible');
    // Custom Size Inputs
cy.contains('Custom Size')
  .parents()
  .find('input')
  .should('have.length.at.least', 2);

cy.contains('Custom Size')
  .parents()
  .find('input')
  .eq(0)
  .type('5');

cy.contains('Custom Size')
  .parents()
  .find('input')
  .eq(1)
  .type('5');
    // Type in custom size inputs
    cy.contains('Custom Size')
      .parents()
      .find('input')
      .eq(0)
      .type('5');

    cy.contains('Custom Size')
      .parents()
      .find('input')
      .eq(1)
      .type('5');

  });

});