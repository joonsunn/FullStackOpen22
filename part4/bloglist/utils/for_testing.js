const reverse = (string) => {
	return string
		.split('')
		.reverse()
		.join('')
}

const average = (array) => {
	const initialValue = 0
	const reducer = (accumulator, currentValue) => {
		return accumulator + currentValue
	}

	return array.length === 0
		? 0
		: array.reduce(reducer, initialValue) / array.length
}

module.exports = {
	reverse,
	average,
}