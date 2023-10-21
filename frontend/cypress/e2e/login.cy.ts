describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should successfully log in with valid credentials', () => {
    const username = 'validUsername'
    const password = 'validPassword'

    cy.get('input[placeholder="Enter your username"]').type(username)
    cy.get('input[placeholder="Enter your password"]').type(password)
    cy.get('button').contains('Log in').click()
  })

  it('should display an error message for invalid credentials', () => {
    const username = 'username'
    const password = 'password'

    cy.get('input[placeholder="Enter your username"]').type(username)
    cy.get('input[placeholder="Enter your password"]').type(password)
    cy.get('button').contains('Log in').click()
  })

  it('should display an error message for an incorrect username', () => {
    const username = 'user'
    const password = 'password'

    cy.get('input[placeholder="Enter your username"]').type(username)
    cy.get('input[placeholder="Enter your password"]').type(password)

    cy.get('.text-red-500').should(
      'contain',
      'Login must contain at least 6 characters',
    )
  })

  it('should display an error message for an incorrect password', () => {
    const username = 'username'
    const password = 'pass'

    cy.get('input[placeholder="Enter your username"]').type(username)
    cy.get('input[placeholder="Enter your password"]').type(password)

    cy.get('.text-red-500').should(
      'contain',
      'Password must contain at least 6 characters',
    )
  })

  it('should display an error message for an incorrect username', () => {
    const username = 'user'
    const password = 'password'

    cy.get('input[placeholder="Enter your username"]').type(username)
    cy.get('input[placeholder="Enter your password"]').type(password)

    cy.get('.text-red-500').should(
      'contain',
      'Login must contain at least 6 characters',
    )
  })

  it('should display an error message for an incorrect password and username', () => {
    cy.get('button').contains('Log in').click()

    cy.get('.text-red-500').should('contain', 'Username is required')
    cy.get('.text-red-500').should('contain', 'Password is required')
  })

  it('should display an error message for an incorrect length password and username', () => {
    const username = 'user'
    const password = 'pass'

    cy.get('input[placeholder="Enter your username"]').type(username)
    cy.get('input[placeholder="Enter your password"]').type(password)

    cy.get('.text-red-500').should(
      'contain',
      'Login must contain at least 6 characters',
    )
    cy.get('.text-red-500').should(
      'contain',
      'Password must contain at least 6 characters',
    )
  })
})
