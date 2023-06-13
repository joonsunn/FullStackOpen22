import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
	const dispatch = useDispatch()

	const handleFilterChange = (event) => {
		event.preventDefault()
		dispatch(filterChange(event.target.value))
	}

	const style = {
		marginBottom: 10
	}

	return (
		<div style = {style}>
			filter <input type = 'text' onChange={handleFilterChange}></input>
		</div>
	)
}

export default AnecdoteFilter