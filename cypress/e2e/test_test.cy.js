describe('Test the pages.', () => {
  it('Main page loads.', function () {
    cy.visit('/en/')
    cy.checkPage()
  })

  it('Accessible from sidebar.', function () {
    cy.visit('/en/')

    cy.get('[class="vp-sidebar-items"]').find('[class*="route-link"]').as('allPages')
        var ind = 0
        cy.get('@allPages').each(function($ele) {
            cy.wrap($ele).revealTab().click().checkPage()
        })

  })
})