// naukri_companies_stub_fixed.cy.js
describe('Naukri Explore Companies - Stub Window Open Example (Fixed)', () => {

  beforeEach(() => {
    // Ignore JS errors from Naukri site
    Cypress.on('uncaught:exception', () => false);
  });

  it('should capture the URL opened in a new tab using stub (or navigate via href)', () => {
    cy.visit('https://www.naukri.com/');

    // Stub the window.open function (some implementations may call it)
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    const selector = "a[title='Explore top companies hiring on Naukri']";

    // Wait for the link to appear, remove target so it opens in same tab, then click
    cy.get(selector, { timeout: 30000 })
      .should('exist')
      .then(($link) => {
        const href = $link.attr('href');

        // Remove target to keep navigation in same tab (robust across implementations)
        cy.wrap($link).invoke('removeAttr', 'target').click();

        // After click, check whether window.open was used by the page scripts.
        cy.get('@windowOpen').then((stub) => {
          if (stub.called) {
            // If page used window.open, visit the captured URL
            const openedUrl = stub.args[0] && stub.args[0][0];
            if (openedUrl) {
              cy.visit(openedUrl);
              cy.url().should('include', '/companies-hiring-in-india');
            } else {
              // Fallback: assert navigation happened
              if (href) {
                const expectedPath = new URL(href, 'https://www.naukri.com').pathname;
                cy.url().should('include', expectedPath);
              }
            }
          } else {
            // window.open was not called; assert navigation happened to the href
            if (href) {
              const expectedPath = new URL(href, 'https://www.naukri.com').pathname;
              cy.url().should('include', expectedPath);
            } else {
              // As a last resort, at least assert that the page changed and contains an expected heading
              cy.contains(/Top Companies|Companies Hiring/i, { timeout: 30000 }).should('exist');
            }
          }
        });
      });
  });
});
