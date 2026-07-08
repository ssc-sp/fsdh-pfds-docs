describe('French and english page links.', () => {
  it('Check main page', function () {
    cy.visit('/en/')
    cy.checkPage()
  })

  it('Check sidebar accessible pages', function () {
    cy.visit('/en/')

    // Finds all internal links from the sidebar and checks them.
    cy.get('[class="vp-sidebar-items"]').find('[class*="route-link"]').each(function($els) {
        cy.visit($els.attr('href'));
        cy.checkPage();
        // Unused code from when I was trying to actually click on the pages, keeping this here if I want to come back to it
        // cy.get('[class="vp-sidebar-items"]').find('[class*="route-link"]').eq(index).revealTab().click().as('cur')
        // cy.get('@cur').click().then(function(elem) {
        //   cy.wrap(elem).checkPage()
        // })
    })
  })
})