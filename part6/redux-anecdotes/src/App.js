import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'

const App = () => {

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