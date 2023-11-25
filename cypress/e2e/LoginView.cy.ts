describe('Login View', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display the login form', () => {
    cy.get('h2').should('exist')
    cy.get('form').should('exist')
    cy.get('#email').should('exist').type('text')
    cy.get('#password').should('exist').type('password')
    cy.get('form button[type="submit"]').should('exist').should('be.disabled')
  })

  it('should show error message on invalid login', () => {
    cy.get('#email').type('test')
    cy.get('.error-message').should('exist')
  })

  it('should navigate to registration page', () => {
    cy.get('a[href="/register"]').click()
    cy.url().should('include', '/register')
  })

  it('should successfully login', () => {
    cy.get('#email').type('test@example.com')
    cy.get('#password').type('123456')
    cy.get('form button[type="submit"]').should('not.be.disabled').click()
    cy.url().should('contain', '/discovery')
  })

  afterEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
})
