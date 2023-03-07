const totalLikes = require('../utils/list_helper').totalLikes

describe('Sum of likes', () => {

	test('a simple array', () => {
		const result = totalLikes([{ name: 'name1', likes:3 }, { name: 'name2', likes: 4 }])
		console.log(`result: ${result}`)
		expect(result).toBe(7)
	})

	test('an empty array', () => {
		const result = totalLikes([])
		console.log(`result: ${result}`)
		expect(result).toBe(0)
	})

	test('an array of not objects', () => {
		const result = totalLikes(['a',  'b'])
		console.log(`result: ${result}`)
		expect(result).toBe(0)
	})

	test('an array of objects that does not have the key "likes"', () => {
		const result = totalLikes([{ name: 'Jason', gender: 'male' }, { name: 'Lissie', gender: 'female' }])
		console.log(`result: ${result}`)
		expect(result).toBe(0)
	})

	test('not a list', () => {
		const result = totalLikes(500)
		console.log(`result: ${result}`)
		expect(result).toBe(0)
	})

	test('also not a list', () => {
		const result = totalLikes('five hundred')
		console.log(`result: ${result}`)
		expect(result).toBe(0)
	})

	test('just one valid object', () => {
		const result = totalLikes({ author: 'Jenny', likes: 54 })
		console.log(`result: ${result}`)
		expect(result).toBe(54)
	})

	test('just one invalid object', () => {
		const result = totalLikes({ author: 'Jenny', gender: 'female' })
		console.log(`result: ${result}`)
		expect(result).toBe(0)
	})

})