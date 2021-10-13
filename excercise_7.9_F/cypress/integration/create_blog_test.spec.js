describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.request('POST', 'http://localhost:3003/api/login', {username:'mluukkai', password:'salainen'})
        .then(response => {
            console.log(response)
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
        })
    })

    /* it('Add blog and like', function() {
        cy.contains('add blog').click()
        cy.get('#titleForm').type('new blog')
        cy.get('#authorForm').type('ibid')
        cy.get('#urlForm').type('none')
        cy.get('#submitBlogButton').click()
        cy.contains('new blog')
        cy.contains('show').click()
        cy.contains('Like').click()
    }) */

    /* it('Add blog and delete', function() {
        cy.contains('add blog').click()
        cy.get('#titleForm').type('new blog')
        cy.get('#authorForm').type('ibid')
        cy.get('#urlForm').type('none')
        cy.get('#submitBlogButton').click()
        cy.contains('new blog')
        cy.contains('show').click()
        cy.contains('Delete').click()
        cy.get('html').should('not.contain', 'ibid')
    })

    it('Add blog and delete, wrong user', function() {
        cy.contains('add blog').click()
        cy.get('#titleForm').type('new blog')
        cy.get('#authorForm').type('ibid')
        cy.get('#urlForm').type('none')
        cy.get('#submitBlogButton').click()

        cy.request('POST', 'http://localhost:3003/api/users', { name: 'test_user', username: 'test_user', password: 'test_pass' })
        cy.request('POST', 'http://localhost:3003/api/login', {username:'test_user', password:'test_pass'})
        .then(response => {
            console.log(response)
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
        })

        cy.contains('new blog')
        cy.contains('show').click()
        cy.contains('Delete').click()
        cy.get('html').should('contain', 'Wrong or invalid login')
    }) */
    
    it('Verify sorting', function() {
        const token = JSON.parse(localStorage.getItem('user')).token
        const auth = `bearer ${token}`
        console.log(auth)
        cy.request({method:'POST', url:'http://localhost:3003/api/blogs', headers:{authorization:auth}, body:{title:'Title1', author:'Author', url:'website'}})
        cy.request({method:'POST', url:'http://localhost:3003/api/blogs', headers:{authorization:auth}, body:{title:'Title2', author:'Author', url:'website'}})
        cy.request({method:'POST', url:'http://localhost:3003/api/blogs', headers:{authorization:auth}, body:{title:'Title3', author:'Author', url:'website'}})
        cy.visit('http://localhost:3000')
        cy.contains('Title1').contains('show').click()
        cy.contains('Title2').contains('show').click()
        cy.contains('Title3').contains('show').click()
        cy.contains('Title1').contains('Like').click()
        cy.wait(2000)
        cy.contains('Title2').contains('Like').click()
        cy.wait(2000)
        cy.contains('Title2').contains('Like').click()
        cy.wait(2000)
        cy.contains('Title3').contains('Like').click()
        cy.wait(2000)
        cy.contains('Title3').contains('Like').click()
        cy.wait(2000)
        cy.contains('Title3').contains('Like').click()
        cy.wait(2000)
        cy.get('.blogData').then(blogs =>{
        console.log(blogs)
        cy.wrap(blogs[0]).should('contain', 'Title3')
        cy.wrap(blogs[1]).should('contain', 'Title2')
        cy.wrap(blogs[2]).should('contain', 'Title1')})
    })
  })
  