import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notiMessage, setNotiMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => 
        setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    if (persons.find(person => person.name === newName)) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`
      
      if (window.confirm(message)) {
        const target = persons.find(person => person.name === newName)

        personService.replace(target.id, newPerson)
          .then(personReplaced => {
            setPersons(persons.map(person => 
              person.id !== target.id ? person : personReplaced))  
            setNewName('')
            setNewNumber('')
            setNotiMessage(`Changed ${personReplaced.name}`)
            setTimeout(() => {
              setNotiMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Information of ${target.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== target.id))
          })
      }
    } 
    else {
      personService.create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setNotiMessage(`Added ${createdPerson.name}`)
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = id => {
    const target = persons.find(p => p.id === id)
    const message = `Delete ${target.name} ?`

    if (window.confirm(message)) {
      personService.remove(id)
        .then(response => {
          setPersons(persons.filter(person =>
            person.id !== id))
        })
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filteredDisplay = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage} />
      <Error message={errorMessage} />
      <Filter handleFilter={handleFilter} filter={filter} />

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handleName={handleName} handleNumber=
        {handleNumber} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>
      {filteredDisplay.map(person => 
        <Person key={person.name} person={person} 
          deletePerson={deletePerson} />
      )}
    </div>    
  );
}

export default App;