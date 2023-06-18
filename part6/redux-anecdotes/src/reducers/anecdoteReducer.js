import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			// const content = action.payload
			state.push(action.payload)
		},
		voteAnecdote(state, action) {
			const id = action.payload
			const anecdoteToVote = state.find(anecdote => anecdote.id === id)
			const changedAnecdote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes + 1
			}
	
			return state.map(anecdote => anecdote.id !== id? anecdote: changedAnecdote)			
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdotesService.getAll()
		// console.log(`initialiseAnecdotes: ${JSON.stringify(anecdotes)}`)
		dispatch(setAnecdotes(anecdotes))
	}
}
export const addAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdotesService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const voteForAnecdote = (id) => {
	return async dispatch => {
		await anecdotesService.voteAnecdote(id)
		dispatch(voteAnecdote(id))
	}
}
export default anecdoteSlice.reducer