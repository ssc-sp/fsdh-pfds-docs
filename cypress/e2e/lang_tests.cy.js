describe('Test the pages.', () => {
  // Creates the test for all pages.
  Cypress.expose('pages').forEach((page) => {
    // Full test for all pages supplied.
    it('check page: ' + page, function() {
      // Verify the current page
      cy.visit(page);
      cy.checkPage();
      // Store current path for comparisons.
      cy.location('pathname').then(function(startLocation) {
        // Change language.
        cy.get('gcds-lang-toggle').click();
        // Verify the path is different and that the page is valid.
        cy.location('pathname').should('not.equal', startLocation);
        cy.checkPage();
        // Verify that the page links back to the original.
        cy.get('gcds-lang-toggle').click()
        cy.location('pathname').should('eq', startLocation)
      });
    });
  });
});