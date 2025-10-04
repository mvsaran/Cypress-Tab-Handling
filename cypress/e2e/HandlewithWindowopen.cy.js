// cypress/e2e/HandlewithWindowopen.cy.js
describe('Naukri Register - Handle button with window.open', () => {

  beforeEach(() => {
    // Ignore site JS errors
    Cypress.on('uncaught:exception', () => false);
  });

  it('should handle registration link navigation', () => {
    cy.visit('https://www.naukri.com/', { failOnStatusCode: false });

    // Stub window.open before interacting with the page
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Wait for element to be ready, remove target, and get href if it exists
    cy.get('#register_Layer', { timeout: 30000 })
      .should('exist')
      .should('be.visible')
      .then(($btn) => {
        // Store href if it exists
        const href = $btn.attr('href');
        // Remove target attribute if it exists
        if ($btn.attr('target')) {
          cy.wrap($btn).invoke('removeAttr', 'target');
        }
        
        // Click the button
        cy.wrap($btn).click();

        // Check window.open first
        cy.get('@windowOpen').then((stub) => {
          if (stub.called && stub.args[0] && stub.args[0][0]) {
            // If window.open was called with a URL, visit it
            const url = stub.args[0][0];
            cy.visit(url, { failOnStatusCode: false });
          } else if (href) {
            // If no window.open but we have an href, construct and visit the full URL
            const fullUrl = new URL(href, 'https://www.naukri.com').toString();
            cy.visit(fullUrl, { failOnStatusCode: false });
          }
          // Otherwise the click should have navigated us directly
        });

        // Verify we reached the registration page (with increased timeout)
        cy.url().should('include', '/registration/createAccount', { timeout: 30000 });
        cy.contains('Create your Naukri profile', { timeout: 30000 }).should('be.visible');
      });
  });
});
