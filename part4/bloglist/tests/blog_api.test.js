const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const login = async () => {
	const newUser = {
		username: 'root1',
		name: 'root1 user',
		password: 'password1'
	}

	const savedUser = await api.post('/api/users').send(newUser)

	const loginResponse = await api.post('/api/login').send({ username: newUser.username, password: newUser.password })

	const token = loginResponse._body.token


	const requestHeader = {
		'Content-Type': 'application/json',
		'Authorization': `bearer ${token}`
	}

	return  { newUser, savedUser, loginResponse, requestHeader }
}

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	const { requestHeader } = await login()

	for (let blog of helper.initialBlogs) {
		await api.post('/api/blogs').send(blog).set(requestHeader)
	}

})

describe('blog api tests', () => {

	test('GET all blogs returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	}, 10000)

	test('Check that "id" is one of the keys', async () => {
		const response = await api.get('/api/blogs')
		const blogs = response.body
		expect(Object.keys(blogs[0]))
			.toBeDefined()
		expect(Object.keys(blogs[0])).toContain('id')
	})

	test('Check blog creation', async () => {
		const { requestHeader } = await login()

		const newBlog = {
			title: 'A trip to Wonderland',
			author: 'Peanut Man',
			likes: 6,
			url: 'http://peanutman.com/blog/a-trip-to-wonderland'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set(await requestHeader)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).toContain('A trip to Wonderland')
	})

	test('Check if no likes when POSTing new blog, default value is 0', async () => {
		const { requestHeader } = await login()

		const newBlog = {
			title: 'Going to the Zoo',
			author: 'Mr Tiger',
			url: 'http://mrtiger.com/blog/going-to-the-zoo'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set(requestHeader)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogList = await helper.blogsInDb()
		expect(blogList[blogList.length-1].likes).toBe(0)

	})

	test('Both title and URL must be present, else return "error 400 Bad Request"', async () => {
		const { requestHeader } = await login()

		const newBlog = {
			title: 'Some thoughts on Cakes',
			author: 'Cake Eater 3000',
			likes: 8
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set(requestHeader)
			.expect(400)

	})

	test('deleting a blog item', async () => {
		const { requestHeader } = await login()

		const response1 = await api
			.get('/api/blogs')
		const blogToDelete = response1.body[0]
		const idToDelete = blogToDelete.id

		const response2 = await api.delete(`/api/blogs/${idToDelete}`).set(requestHeader)
		expect(response2.status).toBe(204)

		const blogListAtEnd = await helper.blogsInDb()
		expect(blogListAtEnd).toHaveLength(helper.initialBlogs.length -1)
	})

	test('updating "likes" of a blog item', async () => {
		const { requestHeader } = await login()
		const response1 = await api.get('/api/blogs')
		const blogList = response1.body
		const blogSelected = blogList[3]

		const updatedBlogEntry = { ...blogSelected, likes:15 }

		const response2 = await api.put(`/api/blogs/${blogSelected.id.toString()}`).send(updatedBlogEntry).set(requestHeader)

		expect(response2.body.likes).toBe(15)
		expect(response2.body.likes).not.toBe(blogSelected.likes)

	})

	test('blog creation fails if token not provided', async () => {

		const newBlog = {
			title: 'A trip to Wonderland',
			author: 'Peanut Man',
			likes: 6,
			url: 'http://peanutman.com/blog/a-trip-to-wonderland'
		}

		const response = await api
			.post('/api/blogs')
			.send(newBlog)

		expect(response.status).toBe(401)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).not.toContain('A trip to Wonderland')
	})

})

afterAll(async () => {
	await mongoose.connection.close()
})