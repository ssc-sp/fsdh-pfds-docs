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

Cypress.Commands.add('checkPage', function() {
    cy.checkHeadFoot()
    cy.get('.vp-sidebar')
    cy.location('pathname').then(function(startLocation) {
        //cy.get('gcds-lang-toggle').click()
        //cy.get('gcds-lang-toggle').click()
        cy.location('pathname').should('eq', startLocation)
    })
})

Cypress.Commands.add('getPage', function() {
    return cy.location('pathname').then(function(pos) {
      return cy.get('.vp-sidebar')
        .find('[class*="route-link"]:visible')
        .filter('[href*="'+pos+'"]')
        .first()
    })
})

Cypress.Commands.add(
    'revealTab', 
    {
        prevSubject: true,
    },
    function(subject) {
    cy.wrap(subject).then(function(elem) {
        if (elem.is(':hidden')/* && !elem.is('[class*="vp-sidebar-items"]')*/) {
            cy.wrap(elem).parent().revealTab()
        }
    }).then(function(elem) {
        if (elem.is('[class*="collapsible"]') || elem.is('[class*="li"]')) {
            cy.wrap(elem).click()
        }
    })
})