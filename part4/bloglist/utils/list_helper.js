const _ = require('lodash')

const dummy = () => {
	return 1
}

/* rewritten using lodash
const totalLikes = (blogList) => {
	// if (typeof(blogList) !== 'object') {
	// 	return 0
	// }
	if (Array.isArray(blogList)){
		const listOfKeys = blogList.map(listItem => Object.keys(listItem))
		// console.log(listOfKeys)
		let validList = false
		listOfKeys.forEach(listItem => {if(listItem.includes('likes')){
			validList = true
		}
		})
		// console.log(validList)
		if (validList) {
			const sumLikes = blogList.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
			return sumLikes
		} else {
			return 0
		}

	} else if (typeof(blogList) === 'object') {
		if (Object.keys(blogList).includes('likes')) {
			return blogList.likes
		} else {
			return 0
		}
	}
	else if (typeof(blogList) !== 'object') {
		return 0
	}
}
*/

const totalLikes = (blogList) => {
	const totalLikes = _.sumBy(blogList, 'likes')
	if (totalLikes) {
		return totalLikes
	} else if (typeof(blogList) === 'object') {
		if (Object.keys(blogList).includes('likes')) {
			return blogList.likes
		} else {
			return 0
		}
	}
	else {
		return 0
	}
}

const favouriteBlog = (blogList) => {
	const favouriteBlog = _.maxBy(blogList, 'likes')
	if (favouriteBlog) {
		return favouriteBlog
	} else if (typeof(blogList) === 'object') {
		if (Object.keys(blogList).includes('title', 'author', 'url', 'likes')) {
			return blogList
		} else {
			return { error: 'not a valid blog list' }
		}
	}
	else {
		return { error: 'not a valid blog list' }
	}
}

const mostBlogs = (blogList) => {
	const groupedByAuthor = _.groupBy(blogList, 'author',)
	// console.log('mostBlogs', groupedByAuthor)

	let authorBlogs = []

	Object.keys(groupedByAuthor).forEach(key => {
		authorBlogs.push({ author: key, blogs: groupedByAuthor[key].length })
	})

	// console.log('Author and numebr of blogs:', authorBlogs)

	const mostBlogs = _.maxBy(authorBlogs, 'blogs')

	// console.log('Author with most blogs:', mostBlogs)

	return mostBlogs
}

const mostLikes = (blogList) => {
	const groupedByAuthor = _.groupBy(blogList, 'author',)
	// console.log('mostBlogs', groupedByAuthor)

	// let authorBlogs = []

	// Object.keys(groupedByAuthor).forEach(key => {
	// 	authorBlogs.push({ author: key, blogs: groupedByAuthor[key].length })
	// })

	// console.log('Author and numebr of blogs:', authorBlogs)

	// const mostBlogs = _.maxBy(authorBlogs, 'blogs')

	// console.log('Author with most blogs:', mostBlogs)

	let authorLikes = []

	Object.keys(groupedByAuthor).forEach(key => {
		authorLikes.push({ author: key, likes: _.sumBy(groupedByAuthor[key], 'likes') })
	})

	// console.log('Author and numebr of likes:', authorLikes)

	const mostLikes = _.maxBy(authorLikes, 'likes')

	// console.log('Author with most likes:', mostLikes)

	return mostLikes
}


module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes,
}