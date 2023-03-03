import numbersService from "../services/numbers"
import App from "../App"

const DisplayDeleteButton = ({person, handleDelete}) => { 
  return (
    <>
      <button onClick={() => {handleDelete(person.id)}} id = {person.id}>DELETE</button>
    </> 
  )
}

const DisplayName = ({person, handleDelete}) => {
    return (
      <li>
        {person.name} {person.number} <DisplayDeleteButton person = {person} handleDelete = {handleDelete}></DisplayDeleteButton>
      </li>
    )
  }
  
const DisplayNames = ({persons, handleDelete}) => {
  if (persons.length < 1) {
    return (
      <>
        No numbers in database yet
      </>
    )
  }
  
  return (
    <>
      {persons.map(person => <DisplayName key = {person.id} person = {person} handleDelete = {handleDelete}></DisplayName>)}
    </>
  )
}

  export default DisplayNames