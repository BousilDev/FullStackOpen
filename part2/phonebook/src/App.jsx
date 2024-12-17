import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
        id: String(persons.length + 1)
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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