import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote, voteForAnecdote } from "../reducers/anecdoteReducer";
import { resetNotification, setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
	return (
		<li>
			<div>{anecdote.content}</div>
			has {anecdote.votes} <button onClick={handleVote}>vote</button>
		</li>
	)
}

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state.anecdotes)
	const currentFilter = useSelector(state => state.filter)
	const handleVote = (anecdote) => {
		dispatch(voteForAnecdote(anecdote.id))
		// dispatch(setNotification(`Voted for "${anecdote.content}"`))
		// setTimeout(() => {dispatch(resetNotification())}, 1000)
		dispatch(setNotification(`Voted for "${anecdote.content}"`, 3000))
	}
	
	return (
		<div>
			{anecdotes.filter(anecdote => anecdote.content.includes(currentFilter)).sort(function(a, b){return b.votes - a.votes}).map(anecdote =>
				<Anecdote key = {anecdote.id} anecdote = {anecdote} handleVote = {() => handleVote(anecdote)}></Anecdote>
			)}
		</div>
	)
}

export default AnecdoteList