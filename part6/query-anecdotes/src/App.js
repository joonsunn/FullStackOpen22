import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from './NotificationContext'
import Button from './components/Button'

const App = () => {
	const queryClient = useQueryClient()

	const voteAnedoteMutation = useMutation(voteAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries('anecdotes')
		}
	})
	
	const handleVote = (anecdote) => {
		console.log('vote')
		voteAnedoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
		
	}

	const results = useQuery(
		'anecdotes',
		getAnecdotes, {
		refetchOnWindowFocus: false
		}
	)
	console.log(results)

if (results.isLoading) {
	return (
		<div>
			loading data...
		</div>
	)
  }

if (results.isError) {
	return (
		<div>
			anecdote service not available due to problems in server
		</div>
	)
}

const anecdotes = results.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            {/* <button onClick={() => handleVote(anecdote)}>vote</button> */}
			<Button anecdote = {anecdote} handleVote={handleVote}></Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
