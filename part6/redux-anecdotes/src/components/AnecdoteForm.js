import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, resetNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const createAnecdote = (event) => {
		event.preventDefault()
		const anecdote = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(addAnecdote(anecdote))
		dispatch(setNotification(`Added anecdote "${anecdote}"`))
		setTimeout(() => {dispatch(resetNotification())}, 3000)
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={event => createAnecdote(event)}>
				<div><input name = 'anecdote'/></div>
				<button type = 'submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm