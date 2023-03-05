const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI

// eslint-disable-next-line no-unused-vars
mongoose.connect(uri).then(result => {
	console.log('connected to MongoDB')
}).catch(error => {
	console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 5,
		required: true
	},
	number: {
		type: String,
		validate: {
			validator: function(v) {
				return /^\d{2,3}-?\d{6,}/.test(v)
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		minLength: 8
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)