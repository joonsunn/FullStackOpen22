import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

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
	return (
		<div>
			{anecdotes.filter(anecdote => anecdote.content.includes(currentFilter)).sort(function(a, b){return b.votes - a.votes}).map(anecdote =>
				<Anecdote key = {anecdote.id} anecdote = {anecdote} handleVote = {() => dispatch(voteAnecdote(anecdote.id))}></Anecdote>
			)}
		</div>
	)
}

export default AnecdoteList