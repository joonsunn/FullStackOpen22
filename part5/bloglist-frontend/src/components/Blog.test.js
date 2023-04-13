import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author only', async () => {
	const blog = {
		title: 'Test blog 1',
		author: 'Test author',
		url: 'http://testBlogUrl.com',
		likes: 0,
		user: '641705e8600886f810581bd1',
		id: '5a422bc61b54a676234d17fc'
	}

	const funcA = () => {}

	const funcB = () => {}

	render(<Blog blog={blog} handleLike={funcA} handleDelete={funcB}></Blog>)

	const element1 = await screen.findByText('Test blog 1 Test author')
	// screen.debug()
	expect(element1).toBeDefined()

	const element2 = await (await screen.findByText(blog.url)).parentElement
	// console.log(element2)
	expect(element2).not.toBeVisible()

})

test('url and likes appear after show_more button clicked', async () => {
	const blog = {
		title: 'Test blog 1',
		author: 'Test author',
		url: 'http://testBlogUrl.com',
		likes: 0,
		user: '641705e8600886f810581bd1',
		id: '5a422bc61b54a676234d17fc'
	}

	const funcA = () => {}

	const funcB = () => {}

	render(<Blog blog={blog} handleLike={funcA} handleDelete={funcB}></Blog>)

	const user = userEvent.setup()
	// screen.debug()
	const button = screen.getByText('show more')
	await user.click(button)
	const element = await (await screen.findByText(blog.url)).parentElement
	expect(element).toBeVisible()

})

test('Like button clicked twice registers twice', async () => {
	const blog = {
		title: 'Test blog 1',
		author: 'Test author',
		url: 'http://testBlogUrl.com',
		likes: 0,
		user: '641705e8600886f810581bd1',
		id: '5a422bc61b54a676234d17fc'
	}

	const mockLike = jest.fn()
	const mockDelete = jest.fn()

	render(<Blog blog={blog} handleLike={mockLike} handleDelete={mockDelete}></Blog>)

	const user = userEvent.setup()
	const showMoreButton = screen.getByText('show more')
	await user.click(showMoreButton)
	const likeButton = screen.getByText('like')
	await user.click(likeButton)
	await user.click(likeButton)

	expect(mockLike.mock.calls).toHaveLength(2)

})