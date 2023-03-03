require('dotenv').config()
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
        "id": 5,
        "name": "Peppa The Pig", 
        "number": "321-654-654"
    },
]

const personsNumber = persons.length
const timeNow = new Date()

app.get('/', (request, response) => {
    response.send("<h1>hello world! You've reached the persons page.</h1>")
})

app.get('/info', (request, response) => {
    response.send(
        `<div>Phonebook has info for ${personsNumber} people</div>
        <div>${timeNow}</div>`
    )
})

app.get('/api/persons', (request, response) => {

    Person.find({}).then(persons => {
        response.json(persons)
    })

})

const name1 = 'i'

app.get('/api/test', (request, response) => {
    Person.find({ name: { $regex: name1, $options: 'i' } }).then(person => {
        console.log(person.length)
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {

    Person.findById(request.params.id).then(person => {
        response.json(person)
    })

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const currentIds = [...persons.map(person => person.id)]
    if (currentIds.includes(id)) {
        persons = persons.filter(person => person.id != id)
        response.send(`Person with id:${id} deleted`)
    } else {
        return(
            response.status(400).json({error: `${id} not found`})
        )
    }

    
})

const generateRandomInteger = () => {
    const randNum = Math.floor(Math.random() * 100000)
    return(randNum)
}

app.get('/api/randnum', (request, response) => {
    // response.send(`${generateId()}`)

    const currentIds = [...persons.map(person => person.id)]

    let notUniqueId = true
    let newId = null

    while (notUniqueId) {
        newId = generateRandomInteger()

        if (!currentIds.includes(newId)) {
            notUniqueId = false
            
        }
    }
    response.send(`newId: ${newId}`)
    console.log(`new unique id:`, newId)
})

const generateUniqueId = () => {
    const currentIds = [...persons.map(person => person.id)]

    let notUniqueId = true
    let newId = null

    while (notUniqueId) {
        newId = generateRandomInteger()

        if (!currentIds.includes(newId)) {
            notUniqueId = false
            return(newId)
        }
    }
}

// const checkNameExists = async (nameToBeChecked) => {
//     const nameExists = await Person.find({ name: { $regex: nameToBeChecked, $options: 'i' } }).then(person => person).length == 1 ? true: false

//     return nameExists
// }

// const updateNumber = async (name) => {
//     const personID = await Person.find({ name: { $regex: name, $options: 'i' } }).then(person => person.id)
//     await Person.findByIdAndUpdate(personID, {number: body.number}, (err, docs) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("Updated user:", docs)
//             response.json(docs)
//         }
//     })
// }

app.post('/api/persons', (request, response) => {   
    

    // console.log(body.number)

    
    const doPost = async () => {
        const body = await request.body
        const nameToBeChecked = await body.name
        const personArray = await Person.find({ name: { $regex: nameToBeChecked, $options: 'i' } })
        const nameExists = personArray.length == 1 ? true: false
        
        if (!body.name) {
            console.log('reach no name loop')
            return (
                response.status(400).json({error: "name missing"})
            )
        } 
        else if (nameExists) {
            console.log('reach find name loop')
            
            // const personList = await Person.find({ name: { $regex: nameToBeChecked, $options: 'i' } })
            // const personObject = personList[0]
            // // console.log(personObject)
            // const personID = personObject._id

            // console.log(`personID: ${personID}`)


            // // response.status(200).json(`personID is ${personID}`)
            
            // Person.findByIdAndUpdate(personID, {name: body.name, number: body.number}, (err, docs) => {
            //     // console.log(docs)
                
            //     if (err) {
            //         console.log(err)
            //         response.status(400).json(err)
            //     } else {
            //         console.log("Updated user:", docs)
            //         response.json(docs)
            //     }
            // })

            response.status(400).json({error: "You are trying to modify an existing entry. Please use the PUT method instead."})

        } 
        else if (!nameExists) {
            console.log('reach add new name loop')
            console.log(`nameExists: ${nameExists}`)
            const person = new Person({
                name: body.name,
                number: body.number
            })
    
            person.save().then(savedPerson => {
                response.json(savedPerson)
            })
        }
    }
    
    doPost()
    
})

app.put('/api/persons/:id', (request, response) => {

    const doPut = async () => {
        const body = await request.body
        const personList = await Person.find({ name: { $regex: body.name, $options: 'i' } })
        const personObject = personList[0]
        // console.log(personObject)
        const personID = personObject._id

        Person.findByIdAndUpdate(personID, {name:body.name, number: body.number}, (err, docs) => {
            console.log('reach update loop')
            if (err) {
                console.log(err)
                response.status(400).json(err)
            } else if (!err) {
                console.log("Updated user:", docs)
                response.json(docs)
            }
        })

    }

    doPut()

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})