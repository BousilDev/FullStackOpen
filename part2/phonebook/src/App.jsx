import { useState, useEffect } from 'react'
import noteService from './services/numbers'

const Filter = ({ filter, change }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={change}/>
    </div>
  )
}

const PersonForm = ({ name, changeName, number, changeNumber, submit}) => {
  return (
    <form onSubmit={submit}>
      <div>
        name: <input value={name} onChange={changeName}/>
      </div>
      <div>
        number: <input value={number} onChange={changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({persons, filter}) => {
  const personsToShow = (
    persons.filter(person => (person.name.toLowerCase()).includes(filter.toLowerCase()))
  )
  return (
    personsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} />)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const submitNote = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName))
      alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {
        name : newName,
        number: newNumber,
      }
      noteService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} change={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm name={newName} changeName={handleNameChange} number={newNumber} changeNumber={handleNumberChange} submit={submitNote}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App