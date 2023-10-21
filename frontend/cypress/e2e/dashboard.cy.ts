describe('Theme Configuration Tests', () => {
  it('Checking whether the system theme is applied', () => {
    cy.visit('/dashboard')

    cy.get('html')
      .invoke('attr', 'class')
      .then(bodyClasses => {
        expect(bodyClasses).to.include('dark')
      })

    cy.get('[data-cy="toggle-theme-button"]').click()

    cy.get('body')
      .invoke('attr', 'class')
      .then(bodyClasses => {
        expect(bodyClasses).to.include('system')
      })
  })

  it('Checking whether the theme is saved in localStorage', () => {
    cy.visit('/dashboard')

    cy.window().then(win => {
      expect(win.localStorage.getItem('dark')).to.be.null
    })

    cy.get('[data-cy="toggle-theme-button"]').click()

    cy.wait(1000)

    cy.window().then(win => {
      expect(win.localStorage.getItem('theme')).to.equal('system')
    })
  })
})
