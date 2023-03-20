const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

// const getTokenFrom = (request) => {
// 	const authorization = request.get('authorization')
// 	if (authorization && authorization.startsWith('bearer')) {
// 		return authorization.replace('bearer ', '')
// 	}
// 	return null
// }

blogsRouter.get('/', async (request, response) => {
	// Blog.find({ }).then(blogs => {
	// 	response.json(blogs)
	// })

	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
	return response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	// Blog.findById(request.params.id)
	// 	.then(blog => {
	// 		if (blog) {
	// 			response.json(blog)
	// 		} else {
	// 			response.status(404).end()
	// 		}
	// 	})
	// 	.catch(error => next(error))

	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.post('/', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	const user = request.user
	// console.log(user)

	if (!user) {
		return response.status(401).end()
	}

	const body = request.body
	// const decodedToken = jwt.verify(request.token, process.env.SECRET)
	// if (!decodedToken.id) {
	// 	return response.status(401).json({ error: 'token invalid' })
	// }

	// const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	})

	// blog.save()
	// 	.then(savedBlog => {
	// 		response.status(201).json(savedBlog)
	// 	})
	// 	.catch(error => next(error))

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	// Blog.findByIdAndRemove(request.params.id)
	// 	.then(() => {
	// 		response.status(204).end()
	// 	})
	// 	.catch(error => next(error))

	// const body = request.body

	// const decodedToken = jwt.verify(request.token, process.env.SECRET)
	// if (!decodedToken.id) {
	// 	return response.status(401).json({ error: 'token invalid' })
	// }

	// const user = await User.findById(decodedToken.id)
	const user = request.user
	// console.log(user)

	const blogToBeDeleted = await Blog.findById(request.params.id)

	if (blogToBeDeleted.user.toString() === user.id.toString()) {
		await Blog.findByIdAndRemove(request.params.id)
		const newUserBlogs = await user.blogs.filter(blog => blog.toString() !== blogToBeDeleted.id)
		user.blogs = newUserBlogs
		await user.save()
		console.log(`Blog entry with id ${request.params.id} successfully deleted.`)
		response.status(204).end()
	} else {
		return response.status(401).send({ error: 'Unauthorised deletion. Deletion aborted.' }).end()
	}

	// await Blog.findByIdAndRemove(request.params.id)
	// response.status(204).end()
})

blogsRouter.put('/:id', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	const user = request.user

	const body = request.body
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	// Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	// 	.then(updatedBlog => {
	// 		response.json(updatedBlog)
	// 	})
	// 	.catch(error => next(error))

	const originalBlogToBeUpdated = await Blog.findById(request.params.id)

	if (originalBlogToBeUpdated.user.toString() === user.id.toString()) {
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		response.json(updatedBlog)
	}


	// const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	// response.json(updatedBlog)

})

module.exports = blogsRouter