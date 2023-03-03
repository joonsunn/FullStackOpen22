import { useState, useEffect } from 'react'

import axios from 'axios'

import DisplayNames from './components/DisplayNames'
import DisplayFilter from './components/DisplayFilter'
import DisplayForm from './components/DisplayForm'
import DisplayNotification from './components/DisplayNotification'

import numbersService from './services/numbers'

const App = () => {
  
  const [persons, setPersons] = useState([]) 
  
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setNewSearch] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [errorType, setErrorType] = useState(null)

  useEffect(() => {
    numbersService.getAll().then(initialNumbers => {
      setPersons(initialNumbers)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const addName = (event) => {
    
    event.preventDefault()

    let nameExists = false
    let duplicateName = {
      name: null,
      number: null,
      id: null
    }
    persons.forEach((person) => {
      if (person.name == newName) {
        nameExists = true
        duplicateName.name = person.name
        duplicateName.number = person.number
        duplicateName.id = person.id
      }
    })

    if (nameExists) {
      if(window.confirm(`${newName} is already added to phonebook. Replace current number ${duplicateName.number} with ${newNumber}?`)) {
        const nameObject = 
        {
          name: newName,
          number: newNumber
        }

        numbersService.update(duplicateName.id, nameObject).then(returnedPerson => {

          numbersService.getAll().then(response => setPersons(response))

          setErrorMessage(`${returnedPerson.name} updated phone number to ${newNumber}`)
          setErrorType(false)
          setTimeout( () => {
            setErrorMessage(null)
            setErrorType(null)
          }, 5000)

        }).catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setErrorType(true)
          setTimeout( () => {
            setErrorMessage(null)
            setErrorType(null)
          }, 5000)
          numbersService.getAll().then(response => setPersons(response))
        })

      }
    } else {
      if (newName == "" || newNumber == "") {
        if (newName == "") {
          setErrorMessage(`Error! Cannot add empty name.`)
        } else if (newNumber == ""){
          setErrorMessage(`Error! Cannot add name without number`)
        }
        setErrorType(true)
        setTimeout( () => {
          setErrorMessage(null)
          setErrorType(null)
        }, 5000)

      } else {
        const nameObject = 
        {
          name: newName,
          number: newNumber
        }
        // numbersService.create(nameObject).then(returnedPerson => {   //method as taught by FSO
        //   setPersons(persons.concat(returnedPerson))
        // }) 
        numbersService.create(nameObject).then(returnedPerson => {    //using the return response from getAll to set persons instead.
          numbersService
            .getAll()
            .then(response => setPersons(response))
          
          setErrorMessage(`${returnedPerson.name} successfully added.`)
          setErrorType(false)
          setTimeout( () => {
            setErrorMessage(null)
            setErrorType(null)
          }, 5000)
        })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {

    const personToBeDeleted = persons.find(person => person.id == id)
    
    if (window.confirm(`Are you sure you want to delete ${personToBeDeleted.name}?`)) {
      numbersService
        .remove(id)
        .then(response => numbersService.getAll().then(response => {
          setPersons(response)
          setErrorMessage(`Deleted ${personToBeDeleted.name}`)
          setErrorType(false)
          setTimeout( () => {
            setErrorMessage(null)
            setErrorType(null)
          }, 5000)
        }))
        .catch(error => {
          if (error.response.status == 404) {
            setErrorMessage(`Information for ${personToBeDeleted.name} already deleted from server.`)
            setErrorType(true)
            setTimeout( () => {
              setErrorMessage(null)
              setErrorType(null)
            }, 5000)
            numbersService
              .getAll()
              .then(response => setPersons(response))
          }
          
        })
    }
  }

  const personFilter = (person) => {
    if(person.name.toLowerCase().includes(newSearch)){  //name search
      return true
    }

    if(person.number.replace("-", "").replace(" ", "").includes(newSearch)){  //number search
      return true
    }
  }

  let filteredPersons = persons.filter(person => personFilter(person))

  return (
    <div>
      <h2>Phonebook</h2>
      <DisplayNotification message = {errorMessage} realError = {errorType}></DisplayNotification>
      <DisplayFilter value = {newSearch} onChange = {handleSearchChange}></DisplayFilter>
      <h2>add a new</h2>
      <DisplayForm onSubmitForm = {addName} valueName = {newName} onChangeName = {handleNameChange} valueNumber = {newNumber} onChangeNumber = {handleNumberChange}></DisplayForm>
      <h2>Numbers</h2>
      <DisplayNames persons = {filteredPersons} handleDelete = {handleDelete}></DisplayNames>
    </div>
  )
}

export default App
