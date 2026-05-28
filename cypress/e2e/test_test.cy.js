describe('Test the pages.', () => {
  it('Main page loads.', function () {
    cy.checkPage('/en/')
  })

  it('Accessible from sidebar.', function () {
    cy.visit('/en/')
    cy.nextPage()

  })
})