import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
	const dispatch = useNotificationDispatch()
	
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
		if (content.length >= 5) {
			newAnecdoteMutation.mutate({content, votes: 0})
			dispatch({type: 'NOTIFY', payload: `Anecdote '${content}' created`})
			setTimeout(() => {dispatch({type: 'RESET'})}, 1000)
		} else {
			dispatch({type: 'LENGTH_ERROR'})
			setTimeout(() => {dispatch({type: 'RESET'})}, 1000)
		}
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
