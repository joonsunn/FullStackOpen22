import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('test that blogform calls event handler correctly with right details when new blog is created', async () => {

	const createBlog = jest.fn()

	const blog = {
		title: 'Title 1',
		author: 'Author 1',
		url: 'http://testBlogUrl.com'
	}

	render(<BlogForm createBlog = {createBlog}></BlogForm>)
	const user = userEvent.setup()

	const inputTitle = screen.getByPlaceholderText('title')
	await userEvent.type(inputTitle, blog.title)

	const inputAuthor = screen.getByPlaceholderText('author')
	await userEvent.type(inputAuthor, blog.author)

	const inputUrl = screen.getByPlaceholderText('url')
	await userEvent.type(inputUrl, blog.url)

	const createButton = screen.getByText('create')
	await user.click(createButton)
	// screen.debug()

	console.log(createBlog.mock.calls[0][0])

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0]).toStrictEqual(blog)

})