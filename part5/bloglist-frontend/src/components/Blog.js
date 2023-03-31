import { useState } from 'react'
import Togglable from './Togglable'


const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false)
	const hideWhenVisible = { display: visible? 'none' : '' }
	const showWhenVisible = { display: visible? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const changeButtonText = (target) => {
		target.innerText = target.innerText === 'show more' ? 'show less' : 'show more'
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
		<div style = {blogStyle}>
			{/* {blog.title} {blog.author} <button onClick={({ target }) => {toggleVisibility(); target.innerHTML = target.innerHTML === 'show more' ? 'show less' : 'show more'}}>show more</button> */}
			{blog.title} {blog.author} <button onClick={({ target }) => {toggleVisibility(); changeButtonText(target)}}>show more</button>
			{/* <button onClick={toggleVisibility} style = {showWhenVisible}>show less</button> */}
			<div style = {showWhenVisible}>
				{/* <ul> */}
				<li>{blog.url}</li>
				<li>{blog.likes} <button>like</button></li>
				<li>{blog.user.name}</li>
				{/* </ul> */}
			</div>
		</div>
	)
}

export default Blog