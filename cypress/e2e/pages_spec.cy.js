describe('Test the pages.', () => {
  it('Initial Visit', () => {
    cy.visit('/')
    cy.checkHeadFoot()
    cy.get('#content a[href="/en/"]')
    cy.get('#content a[href="/fr/"]')
  })
  it('Average Page', () => {
    cy.visit('/en/')
    cy.checkFull()
  })
})