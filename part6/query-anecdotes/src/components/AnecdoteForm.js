import { getAnecdotes, createAnecdote } from '../requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
			console.log(anecdotes)
		}
	})

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		console.log(content)
		newAnecdoteMutation.mutate({content, votes: 0})
	}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
