describe('Theme Configuration Tests', () => {
  it('Checking whether the dark theme is applied', () => {
    cy.visit('/')

    cy.get('html')
      .invoke('attr', 'class')
      .then(bodyClasses => {
        expect(bodyClasses).to.include('dark')
      })

    cy.get('[data-cy="toggle-theme-button"]').click()

    cy.get('html')
      .invoke('attr', 'class')
      .then(bodyClasses => {
        expect(bodyClasses).to.include('dark')
      })
  })

  it('Checks whether the theme is saved in localStorage', () => {
    cy.visit('/')

    cy.window().then(win => {
      expect(win.localStorage.getItem('theme')).to.be.null
    })

    cy.get('[data-cy="toggle-theme-button"]').click()

    cy.wait(1000)

    cy.window().then(win => {
      cy.wrap(win.localStorage.getItem('theme')).should('eq', 'system')
    })
  })
})
