describe('Neverlose - Edit Item Flow', () => {
  beforeEach(() => {
    // Replace with your actual local or hosted URL
    cy.visit('http://localhost:3000/dashboard');
  });

  it('should successfully update the description of an existing item', () => {
    // 1. Locate the item 'ffgc' and click the view report/details icon
    // Using the 'View Report' column index from the dashboard image
    cy.contains('ffgc')
     
      .click();

    // 2. Click the 'Edit' pencil icon on the Item Details page
    cy.get('.btn.btn-edit.btn-link').first().click(); // Targeting the pencil icon button

    // 3. Verify we are on the Edit page
    cy.get('h3').should('contain', 'Edit Your Item');

    // 4. Update the description field
    const newDescription = 'my new ' + Date.now();
    cy.get('textarea[name="description"]') // Adjust selector if it uses an ID or different attribute
      .clear()
      .type(newDescription);

       // Upload image (mock file)
    cy.get('input[type="file"]').selectFile('cypress/fixtures/laptop.jpg', { force: true });
    cy.log('Pausing for 20 seconds to inspect the uploaded image...');
    cy.wait(10000);

    // 5. Submit the update
    cy.contains('button', 'Update Item').click();

    // 6. Verification: Ensure we are redirected back to Item Details 
    // and the new description is visible
    cy.url().should('include', '/item-details');
    cy.get('p').should('contain', newDescription);
    
    // Optional: Check that 'No description provided' is gone
    cy.contains('No description provided').should('not.exist');
  });
});