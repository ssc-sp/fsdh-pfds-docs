// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('checkHeadFoot', function() {
    cy.get('.vp-navbar')
    cy.get('.gc-footer')
})

Cypress.Commands.add('checkPage', function(url) {
    cy.visit(url)
    cy.checkHeadFoot()
    cy.get('.vp-sidebar')
    cy.get('gcds-lang-toggle').click()
    cy.get('gcds-lang-toggle').click()
    cy.url().should('include', url)
})

Cypress.Commands.add('nextPage', function() {
    cy.location('pathname').then(function(pos) {
      cy.get('.vp-sidebar')
        .find('[class*="route-link"]:visible')
        .filter('[href*="'+pos+'"]')
        .first()
        .parent()
        .next()
        .then(function($el) {
            cy.wrap($el).click()
        })
    })
})