describe('Go to the site.', () => {
  it('Initial Visit', () => {
    cy.visit('/')
    cy.checkElements()
    cy.get('#content a[href="/en/"]')
    cy.get('#content a[href="/fr/"]')
  })
})