import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotesService'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(initializeAnecdotes())
	}, [dispatch])


	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification></Notification>
			<AnecdoteFilter></AnecdoteFilter>
			<AnecdoteList></AnecdoteList>
			<AnecdoteForm></AnecdoteForm>
		</div>
	)
}

export default App