describe('Naukri Tab Handling Example', () => {
  it('Should open Naukri Register page in same tab', () => {
    // Step 1: Visit naukri
    cy.visit('https://www.naukri.com/');

    // Step 2: Remove target attr so it doesn't open a new tab
    cy.get('#register_Layer')
      .invoke('removeAttr', 'target')
      .click();

    // Step 3: Verify we are on the registration page
    cy.url().should('include', '/registration/createAccount');
    cy.contains('Create your Naukri profile').should('be.visible');
  });
});
