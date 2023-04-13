import { useState } from 'react'

const BlogForm = ({
	createBlog
}) => {
	const [newTitle, setTitle] = useState('')
	const [newAuthor, setAuthor] = useState('')
	const [newUrl, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()

		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl
		})

		setTitle('')
		setAuthor('')
		setUrl('')

	}

	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit = {addBlog}>
				<div>
					Title:
					<input
						id = 'new-blog-title'
						type = 'text'
						value = {newTitle}
						onChange = {event => setTitle(event.target.value)}
						placeholder='title'
					></input>
				</div>
				<div>
					Author:
					<input
						id = 'new-blog-author'
						type = 'text'
						value = {newAuthor}
						onChange = {event => setAuthor(event.target.value)}
						placeholder='author'
					></input>
				</div>
				<div>
					Url:
					<input
						id = 'new-blog-url'
						type = 'text'
						value = {newUrl}
						onChange = {event => setUrl(event.target.value)}
						placeholder='url'
					></input>
				</div>
				<button id = 'blog-submit' type = 'submit'>create</button>
			</form>
		</div>
	)
}

export default BlogForm