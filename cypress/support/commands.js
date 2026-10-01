// Verifies that all expected page elements are present.
// Currently the header, footer, sidebar and language toggle
// (does not test the language toggle's functionality, only it's presence)
Cypress.Commands.add('checkPage', function() {
    cy.get('.vp-navbar')
    cy.get('.gc-footer')
    cy.get('.vp-sidebar')
    cy.get('gcds-lang-toggle')
})