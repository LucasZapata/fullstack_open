describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        localStorage.removeItem('user')
    })
  
    it('Login form is shown', function() {
        cy.get('#loginForm')
    })

    it('Inorrect login attempt', function() {
        cy.get('#username').type('mluukka')
        cy.get('#password').type('salaine')
        cy.get('#loginButton').click()
        cy.contains('Wrong or invalid login')
    })

    it('Correct login attempt', function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#loginButton').click()
        cy.contains('Logged in as Matti Luukkainen')
    })
  })
  