const mongoose = require('mongoose')

const PROCESSARGV = process.argv



if (PROCESSARGV.length < 3) {
    console.log("Please supply the password to proceed")
    process.exit(1)
}

const password = PROCESSARGV[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (PROCESSARGV.length == 5) {

    const person = new Person({
        name: PROCESSARGV[3], 
        number: PROCESSARGV[4]
    })

    person.save().then(result => {
        console.log(result)
        console.log('person saved')
        mongoose.connection.close()
    })

} else if (PROCESSARGV.length == 3) {

    Person.find().then(result => {
        result.forEach(person => console.log(person))
        mongoose.connection.close()
    })
}

