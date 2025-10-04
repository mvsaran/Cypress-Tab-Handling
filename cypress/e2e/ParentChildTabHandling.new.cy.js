// cypress/e2e/ParentChildTabHandling.new.cy.js
describe('Naukri Register Tab Handling Demo', () => {
  const PARENT_URL = 'https://www.naukri.com/';
  const TIMEOUT = 30000;

  beforeEach(() => {
    // Ignore Naukri JS errors and uncaught exceptions
    Cypress.on('uncaught:exception', () => false);
  });

  it('should navigate to register page and back', () => {
    // Visit parent page
    cy.visit(PARENT_URL, { 
      failOnStatusCode: false,
      timeout: TIMEOUT 
    });

    // Setup window.open stub
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Click register and handle navigation
    cy.get('#register_Layer', { timeout: TIMEOUT })
      .should('exist')
      .should('be.visible')
      .then(($btn) => {
        // Remove target attribute to keep navigation in same tab
        cy.wrap($btn)
          .invoke('removeAttr', 'target')
          .click();

        // Check if window.open was called
        cy.get('@windowOpen').then((stub) => {
          if (stub.called && stub.args[0]?.[0]) {
            cy.visit(stub.args[0][0], { 
              failOnStatusCode: false,
              timeout: TIMEOUT 
            });
          }
        });
      });

    // Verify registration page loaded
    cy.url().should('include', '/registration/createAccount');
    cy.contains('Create your Naukri profile', { timeout: TIMEOUT })
      .should('be.visible');

    // Return to parent page
    cy.visit(PARENT_URL, { 
      failOnStatusCode: false,
      timeout: TIMEOUT 
    });
    cy.url().should('eq', PARENT_URL);
  });
});

  