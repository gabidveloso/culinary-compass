describe('Register View', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it.skip('should successfully register a new user', () => {
    cy.get('#username').type('testuser')
    cy.get('#email').type('test1@example.com')
    cy.get('#password').type('123456')
    cy.get('#confirm-password').type('123456')

    cy.get('form button[type="submit"]').should('not.be.disabled').click()

    cy.url().should('include', '/discovery')
  })

  it('should show an error message for invalid registration', () => {
    cy.get('#email').type('test')

    cy.get('.error-message').should('exist')
  })

  it('should navigate to login page', () => {
    cy.get('a[href="/login"]').click()
    cy.url().should('include', '/login')
  })

  afterEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
})
