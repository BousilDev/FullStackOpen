import { useState, useEffect } from 'react'
import noteService from './services/numbers'
import './index.css'

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

const Person = ({ person, removePerson }) => {
  return (
    <div>
      <p>
        {person.name} {person.number} {" "}   
        <button onClick={() => removePerson(person)}>delete</button>
      </p>
    </div>
  )
}

const Persons = ({persons, filter, removePerson}) => {
  const personsToShow = (
    persons.filter(person => (person.name.toLowerCase()).includes(filter.toLowerCase()))
  )
  return (
    personsToShow.map(person => <Person key={person.id} person={person} removePerson={removePerson}/>)
  )
}

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const refreshPersons = () => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }

  useEffect(refreshPersons, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const showMessage = (message, setMyMessage) => {
      setMyMessage(message)
      setTimeout(() => {
        setMyMessage(null)
      }, 5000)
  }

  const submitPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        const updatedPerson = { ...oldPerson, number: newNumber}
        noteService
          .update(updatedPerson.id, updatedPerson).then(response => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? response : person))
            setNewName('')
            setNewNumber('')
            showMessage(`Updated ${updatedPerson.name}`, setMessage)
          })
          .catch(() => {
            showMessage(`Information of ${oldPerson.name} has already been removed from server`, setErrorMessage)
            setPersons(persons.filter(p => p.id !== oldPerson.id))
          })
      }
    }
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
          showMessage(`Added ${personObject.name}`, setMessage)
        })
    }
  }

  const removePerson = person => {
    if (confirm(`Delete ${person.name} ?`)) {
      noteService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(filterPerson => filterPerson.id !== person.id))
        })
        .catch(() => {
          showMessage(`Information of ${person.name} has already been removed from server`, setErrorMessage)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={'notification'}/>
      <Notification message={errorMessage} className={'error'}/>
      <Filter filter={newFilter} change={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm name={newName} changeName={handleNameChange} number={newNumber} changeNumber={handleNumberChange} submit={submitPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} removePerson={removePerson} />
    </div>
  )
}

export default App