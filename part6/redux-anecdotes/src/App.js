// import { useSelector, useDispatch } from 'react-redux'
// import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
//   const anecdotes = useSelector(state => state)
//   const dispatch = useDispatch()

	return (
		<div>
			<h2>Anecdotes</h2>
			<AnecdoteList></AnecdoteList>
			<AnecdoteForm></AnecdoteForm>
		</div>
	)
}

export default App