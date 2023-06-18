import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const object = { content, votes: 0 }
	const response = await axios.post(baseUrl, object)
	return response.data
}

const voteAnecdote = async (id) => {
	const getAll = await axios.get(baseUrl)
	const anecdotes = getAll.data
	const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id)
	const object = {
		content: anecdoteToVote.content,
		votes: anecdoteToVote.votes + 1,
	}
	const response = await axios.put(`${baseUrl}/${id}`, object, {header: 'Content-Type: application/json'})
	// console.log(response.data)
	return response.data
}

export default { getAll, createNew, voteAnecdote }