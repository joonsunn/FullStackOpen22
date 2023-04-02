import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
	const [visible, setVisible] = useState(false)
	// const hideWhenVisible = { display: visible? 'none' : '' }
	const showWhenVisible = { display: visible? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const changeButtonText = (target) => {
		target.innerText = target.innerText === 'show more' ? 'show less' : 'show more'
	}

	const addLike = () => {
		handleLike({
			// ...blog,
			id: blog.id,
			likes: blog.likes + 1
		})
	}

	const performDelete = () => {
		handleDelete(blog.id)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
		listStyleType: 'none'
	}

	return (
		<div style = {blogStyle} id = {blog.id}>
			{blog.title} {blog.author} <button onClick={({ target }) => {toggleVisibility(); changeButtonText(target)}}>show more</button>
			<div style = {showWhenVisible}>
				<li>{blog.url}</li>
				<li>{blog.likes} <button onClick={() => addLike()}>like 👍</button></li>
				<li>{blog.user.name}</li>
				<button onClick={() => performDelete()} style = {{ backgroundColor: 'pink' }}>Remove blog entry</button>
			</div>
		</div>
	)
}

export default Blog