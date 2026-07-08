// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Checks if the page has both a header and a footer.
Cypress.Commands.add('checkHeadFoot', function() {
    cy.get('.vp-navbar')
    cy.get('.gc-footer')
})

// Supposedly the full test for any given page.
// Add things here to check every page for it.
// Currently checks for the presence of the header and footer and if the language toggle returns to the same page if clicked twice.
Cypress.Commands.add('checkPage', function() {
    cy.checkHeadFoot()
    cy.get('.vp-sidebar')
    cy.location('pathname').then(function(startLocation) {
        cy.get('gcds-lang-toggle').click()
        cy.location('pathname').should('not.equal', startLocation)
        //honestly maybe we should check that there is content on the page but that's easy to add later.
        cy.get('gcds-lang-toggle').click()
        cy.location('pathname').should('eq', startLocation)
    })
})

// Gets the element for this page in the sidebar.
Cypress.Commands.add('getPage', function() {
    return cy.location('pathname').then(function(pos) {
      return cy.get('.vp-sidebar')
        .find('[class*="route-link"]:visible')
        .filter('[href*="'+pos+'"]')
        .first()
    })
})

// Theoretically opens all the tabs required to see the page in the sidebar.
// Seemingly misclicks sometimes?
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