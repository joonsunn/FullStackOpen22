import { useContext } from "react"
import NotificationContext, { useNotificationDispatch } from "../NotificationContext"

const Button = ({ handleVote, anecdote }) => {
	const dispatch = useNotificationDispatch()
	const voteButtonClick = () => {
		handleVote(anecdote)
		dispatch({type: 'NOTIFY', payload: `Anecdote '${anecdote.content}' voted`})
		setTimeout(() => dispatch({type: 'RESET'}), 1000)
	}
	return (
		<button anecdote = {anecdote} onClick={voteButtonClick}>
			vote
		</button>
	)
}

export default Button