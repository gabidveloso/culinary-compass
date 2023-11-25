describe('MyAccount View', () => {
  beforeEach(() => {
    cy.session('User Session', () => {
      cy.login('test7@example.com', '123456')
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 200)
    })

    cy.visit('/edit-user')
    cy.url().should('include', '/edit-user')
  })

  it('should display the MyAccount form', () => {
    cy.get('h2').should('exist')
    cy.get('form').should('exist')
    cy.get('#username').should('exist')
    cy.get('#email').should('exist')
    cy.get('form button[type="submit"]').should('exist').should('be.disabled')
  })

  // it('should show an error message on invalid form submission', () => {
  //   cy.get('#username').type('new name').trigger('input');

  //   cy.get('#username').should('exist')
  //   cy.get('input').should('have.length', 2)
  // })

  // it('should change email successfully', () => {
  //   cy.get('form #email').type('newmail3@example.com')
  //   cy.get('#username').type('new name')
  //   cy.get('form button[type="submit"]').should('not.be.disabled').click()

  // cy.get('.modal').should('exist')
  // cy.get('.modal input').should('exist')

  // cy.get('.modal input').type('123456')

  // cy.get('.modal button[type="submit"]').should('not.be.disabled').click()
  // cy.get('.modal button[type="submit"]').should('not.be.disabled').click()
  // cy.get('.modal').should('not.exist')
  // })

  // it('should show an error message on failed email change', () => {
  //   // Trigger an error condition for email change (e.g., invalid password)
  //   cy.get('#password').type('invalidpassword')
  //   cy.get('form button[type="submit"]').should('not.be.disabled').click()
  //   // Handle modal behavior (e.g., input new email, submit, etc.)
  //   // Ensure that the error message is displayed
  //   cy.get('.modal-error-message').should('exist') // Adjust based on the actual selector for the modal error message
  // })

  beforeEach(() => {
    cy.logout()
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
  })
})
