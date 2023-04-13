import { useState } from 'react'
import PropTypes from 'prop-types'

// const LoginForm = ({
// 	handleSubmit,
// 	handleUsernameChange,
// 	handlePasswordChange,
// 	username,
// 	password
// }) => {
// 	return (
// <div>
// 	<h2>login</h2>
// 	<form onSubmit = {handleSubmit}>
// 		<div>
// 			username
// 			<input
// 				type = 'text'
// 				value = {username}
// 				name = 'Username'
// 				onChange = {handleUsernameChange}
// 			></input>
// 		</div>
// 		<div>
// 			password
// 			<input
// 				type = 'password'
// 				value = {password}
// 				name = 'Password'
// 				onChange = {handlePasswordChange}
// 			></input>
// 		</div>
// 		<button type = 'submit'>login</button>
// 	</form>
// </div>
// 	)
// }

const LoginForm = ({
	handleLogin
}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const login = (event) => {
		event.preventDefault()
		handleLogin({
			username,
			password
		})

		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>login</h2>
			<form onSubmit = {login}>
				<div>
					username
					<input
						id = 'username'
						type = 'text'
						value = {username}
						name = 'Username'
						onChange = {event => setUsername(event.target.value)}
					></input>
				</div>
				<div>
					password
					<input
						id = 'password'
						type = 'password'
						value = {password}
						name = 'Password'
						onChange = {event => setPassword(event.target.value)}
					></input>
				</div>
				<button id = 'login-button' type = 'submit'>login</button>
			</form>
		</div>
	)
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired
}

export default LoginForm