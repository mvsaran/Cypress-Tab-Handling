// sbi_privacy_href.cy.js
describe('SBI Privacy Notice - Href Example', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false); // ignore SBI site errors
  });

  it('navigates using href attribute', () => {
    cy.visit('https://sbi.bank.in/', { failOnStatusCode: false });

    cy.get('a[href="/web/nri/privacy-notice-and-consent-forms"]')
      .should('have.attr', 'href')
      .then((href) => {
        const fullUrl = `https://sbi.bank.in${href}`;
        cy.visit(fullUrl, { failOnStatusCode: false });
      });

   // cy.url().should('include', '/privacy-notice-and-consent-forms');
   // cy.contains('Privacy Notice', { matchCase: false }).should('be.visible');
  });
});
