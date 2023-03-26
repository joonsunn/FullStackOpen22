import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [newTitle, setTitle] = useState('')
	const [newAuthor, setAuthor] = useState('')
	const [newUrl, setUrl] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [errorType, setErrorType] = useState(null)

	const promptMessage = (message, errorType) => {
		setErrorType(errorType)
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
			setErrorType(null)
		}, 5000)
	}

	useEffect(() => {
		const blogsInitialisation = async () => {
			const blogs = await blogService.getAll()
			setBlogs(blogs)
		}
		blogsInitialisation()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')

			promptMessage(`Welcome ${user.name}`, false)

		} catch (exception) {
			// console.log(exception)
			promptMessage('Unable to login. username/password does not exist', true)
		}
	}

	const handleLogout = () => {
		try {
			window.localStorage.removeItem('loggedBlogappUser')
			setUser(null)
			promptMessage('Successfully logged out', false)
		} catch (exception) {
			console.log(exception)
		}
	}

	const handleBlogCreation = async (event) => {
		event.preventDefault()

		try {
			const newBlog = {
				title: newTitle,
				author: newAuthor,
				url: newUrl
			}
			console.log(newBlog)

			const savedBlog = await blogService.create(newBlog)
			setBlogs(blogs.concat(savedBlog))
			setTitle('')
			setAuthor('')
			setUrl('')
			promptMessage(`New blog entry "${newBlog.title}" saved!`, false)

		} catch (exception) {
			// console.log(exception)
			promptMessage('Unable to create blog entry', true)
		}

	}

	const loginForm = () => (
		<form onSubmit = { handleLogin }>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}>
				</input>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}>
				</input>
			</div>
			<button type="submit">login</button>
		</form>
	)

	const blogEntryForm = () => (
		<form onSubmit={handleBlogCreation}>
			<div>
			title
				<input
					type='text'
					value={newTitle}
					onChange={({ target }) => setTitle(target.value)}>
				</input>
			</div>
			<div>
			author
				<input
					type='text'
					value={newAuthor}
					onChange={({ target }) => setAuthor(target.value)}>
				</input>
			</div>
			<div>
			url
				<input
					type='text'
					value={newUrl}
					onChange={({ target }) => setUrl(target.value)}>
				</input>
			</div>
			<button type="submit">Create new blog entry</button>
		</form>
	)



	return (
		<div>
			<h1>Blog application</h1>
			<Notification message = {errorMessage} realError = {errorType}></Notification>

			{!user && <div><h2>Login to application</h2><div>{loginForm()}</div></div>}
			{user &&
			<div>
				<h2>blogs</h2>
				<p>{user.name} logged in</p>
				<div>
					<button onClick = {() => handleLogout()}>logout</button>
				</div>
				<br></br>
				<div>
					{blogEntryForm()}
				</div>
				<br></br>
				{blogs
					.filter(blog => blog.user !== JSON.stringify(user.id))
					.map(filteredBlog => <Blog key={filteredBlog.id} blog={filteredBlog} />)
				}
			</div>
			}

		</div>
	)
}

export default App
