const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let newBlog = new Blog(blog)
		await newBlog.save()
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
		// const oldBlogList = await helper.blogsInDb()

		const newBlog = {
			title: 'A trip to Wonderland',
			author: 'Peanut Man',
			likes: 6,
			url: 'http://peanutman.com/blog/a-trip-to-wonderland'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		// console.log(blogsAtEnd)

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).toContain('A trip to Wonderland')
	})

	test('Check if no likes when POSTing new blog, default value is 0', async () => {
		const newBlog = {
			title: 'Going to the Zoo',
			author: 'Mr Tiger',
			url: 'http://mrtiger.com/blog/going-to-the-zoo'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogList = await helper.blogsInDb()
		expect(blogList[blogList.length-1].likes).toBe(0)

	})

	test('Both title and URL must be present, else return "error 400 Bad Request"', async () => {
		const newBlog = {
			title: 'Some thoughts on Cakes',
			author: 'Cake Eater 3000',
			likes: 8
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		// const response = await api
		// 	.post('/api/blogs')
		// 	.send(newBlog)

		// // console.log(response)
		// expect(response.status).toBe(400)

	})

})

afterAll(async () => {
	await mongoose.connection.close()
})