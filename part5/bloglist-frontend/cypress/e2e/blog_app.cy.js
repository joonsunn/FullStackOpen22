describe('template spec', () => {
	before(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'root',
			username: 'root',
			password: 'password'
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
		// cy.get('#username').type(user.username)
		// cy.get('#password').type(user.password)
		// cy.get('#login-button').click()

		cy.login({ username: user.username, password: user.password })
		cy.get('#new-blog-title').type('test title 1')
		cy.get('#new-blog-author').type('test author 1')
		cy.get('#new-blog-url').type('http://testblog.com')
		cy.get('#blog-submit').click()
		cy.get('#logout').click()



	})

	it('log in form is shown by default', function() {
		cy.get('#username').not('have.css', 'visible')
	})

	describe('log in', function() {
		beforeEach(function() {
			// const user = {
			// 	name: 'root',
			// 	username: 'root',
			// 	password: 'password'
			// }
			// cy.login({ username: user.username, password: user.password })
			cy.visit('http://localhost:3000')
		})

		it('log in can be performed successfully with correct credentials', function() {
			const user = {
				name: 'root',
				username: 'root',
				password: 'password'
			}
			cy.get('#username').type(user.username)
			cy.get('#password').type(user.password)
			cy.get('#login-button').click()
			cy.contains('root logged in')
		})

		it('login cannot be performed with an incorrect credential', function() {
			cy.get('#username').type('wrong')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()
			cy.contains('unable', { matchCase: false })
		})

	})

	describe('when logged in', function() {
		before(function() {
			const user = {
				name: 'root',
				username: 'root',
				password: 'password'
			}
			cy.login({ username: user.username, password: user.password })
			cy.visit('http://localhost:3000')
			// cy.get('#new-blog-title').type('test title 1')
			// cy.get('#new-blog-author').type('test author 1')
			// cy.get('#new-blog-url').type('http://testblog.com')
			// cy.get('#blog-submit').click()
		})

		beforeEach(function() {
			cy.visit('http://localhost:3000')
			const user = {
				name: 'root',
				username: 'root',
				password: 'password'
			}
			cy.login({ username: user.username, password: user.password })
		})

		it('new blog can be created', function() {
			// cy.contains('button', 'new blog').click()
			cy.get('#new-blog-title').type('test title 2')
			cy.get('#new-blog-author').type('test author 2')
			cy.get('#new-blog-url').type('http://testblog2.com')
			cy.get('#blog-submit').click()

			cy.contains('test author 2')
		})

		it('can like blog', function() {
			cy.contains('test author 1').contains('show more').click()

			cy.contains('test author 1').contains('span', '0')
			cy.contains('button', 'like').click()
			cy.contains('test author 1').contains('span', '1')
		})

		it('can delete blog', function() {
			cy.contains('test author 1').contains('show more').click()
			cy.contains('button', 'Remove').click()
			cy.contains('test author 1').should('not.exist')
		})

		it('delete button only appears if logged in', function() {
			cy.contains('test author 2').contains('show more').click()
			cy.contains('button', 'Remove').should('exist')
			cy.contains('button', 'logout').click()
			cy.contains('test author 2').contains('show more').click()
			cy.contains('button', 'Remove').should('not.exist')
		})
	})

	describe.only('blogs are ordered', function() {
		before(function() {
			const user = {
				name: 'root',
				username: 'root',
				password: 'password'
			}
			cy.login({ username: user.username, password: user.password })
			cy.visit('http://localhost:3000')

			cy.get('#new-blog-title').type('This blog has 6 likes')
			cy.get('#new-blog-author').type('Author 2')
			cy.get('#new-blog-url').type('http://testblog2.com')
			cy.get('#blog-submit').click()

			cy.contains('Author 2').contains('show more').click()
			cy.contains('Author 2').contains('button', 'like').as('likeButton1')

			cy.contains('test author 1').contains('show more').click()
			cy.contains('test author 1').contains('button', 'like').as('likeButton2')

			cy.get('@likeButton2').click()
			cy.wait(500)
			cy.get('@likeButton2').click()
			cy.wait(500)
			cy.get('@likeButton1').click()
			cy.wait(500)
			cy.get('@likeButton1').click()
			cy.wait(500)
			cy.get('@likeButton1').click()
			cy.wait(500)
			cy.get('@likeButton1').click()
			cy.wait(500)
			cy.get('@likeButton1').click()
			cy.wait(500)
			cy.get('@likeButton1').click()

		})
		it('in descending order of likes', function() {
			cy.get('.blog').eq(0).should('contain', 'This blog has 6 likes Author 2')
			cy.get('.blog').eq(1).should('contain', 'test title 1')
		})
	})
})