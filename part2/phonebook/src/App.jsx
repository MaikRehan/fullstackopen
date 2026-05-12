import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const Name = ({person, deleteEntry}) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={deleteEntry}>delete</button>
    </li>
  )
}

const Filter = ({filterNamesShown}) => {
    return (
    <form>
        <div>filter shown with:
            <input
                onChange={filterNamesShown}
            />
        </div>
    </form>
    )
}

const PersonForm = (props) => {
    return (
    <form onSubmit={props.addName}>
        <div>name:
            <input
                value={props.newName}
                onChange={props.handleNameChange}
            />
        </div>
        <div>number:
            <input
                value={props.newNumber}
                onChange={props.handleNumberChange}
            />
        </div>
        <div><button type="submit">add</button></div>
    </form>
    )
}

const FilteredNamesList = (props) => {
    return (
        <ul>
            {(props.personsFiltered ?? props.persons).map(person =>
                <Name key={person.name}
                      person={person}
                      deleteEntry={() => props.deleteEntry (person.id)}/>
            )}
        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName,  setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [personsFiltered, setShowFiltered] = useState(null)
    const [errorMessage, setNotification] = useState(null)
    const [messageType, setMessageType] = useState('notification')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

  const addName = (event) => {
      event.preventDefault()

     const existingPerson = persons.find(person => person.name === newName)
     console.log(existingPerson)
     if (existingPerson) {
        const updatedPerson = {
            ...existingPerson,
            number: newNumber,
        }
        console.log(updatedPerson)
        if(window.confirm('Are you sure you want to update the number of this entry?')) {
            personService
                .update(existingPerson.id, updatedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
                    setNewName('')
                    setNewNumber('')
                    setNotification(`Updated '${updatedPerson.name}'s number `)
                    setTimeout(() => setNotification(null), 2000)
                })
        } else {
            console.log('Update of entry with the name ${personObject.name} and name  cancelled')
        }
    } else {
        const personObject = {
            name: newName,
            number: newNumber,
        }
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setNotification(`Added '${returnedPerson.name}' `)
                setTimeout(() => setNotification(null), 2000)
            })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNamesShown = (event) => {
    setShowFiltered(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
      }

  const deleteEntry = (id) => {
      if(window.confirm('Are you sure you want to delete this entry?')) {
          personService
              .deleteEntry(id)
              .then(() => {
                  setPersons(persons.filter(person => person.id !== id))
              })
              .catch(error => {
                  setNotification(`Entry with id '${id}' was already deleted from the server`)
                  setMessageType('error')

              })
          setNotification(`Deleted Person with id '${id}' `)
          setTimeout(() => setNotification(null), 2000)
          setTimeout(() => setMessageType('notification'), 2000)

      } else {
          console.log('Deletion of entry with the id ${id} cancelled')
      }
  }

    return (
      <div>
          <h2>
              Phonebook
          </h2>
          <Notification message={errorMessage} messageType={messageType} />
          <Filter filterNamesShown={filterNamesShown} />

        <h2>add a new</h2>
        <PersonForm handleNameChange={handleNameChange}
                    addName={addName}
                    newName={newName}
                    newNumber={newNumber}
                    handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2>
        <FilteredNamesList
            persons={persons}
            personsFiltered={personsFiltered}
            deleteEntry={deleteEntry}
        />
      </div>
  )
}

export default App