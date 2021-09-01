import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PhoneList from './components/PhoneList.js'
import NewEntry from './components/NewEntry.js'
import Filter from './components/Filter.js'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterForm, setFilterForm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {setPersons(response.data)})
    console.log(persons)})

  const writeName = (event) => setNewName(event.target.value)
  const writeNumber = (event) => setNewNumber(event.target.value)
  const writeFilterForm = (event) => setFilterForm(event.target.value)
  const setFilter = (event) => {
    event.preventDefault()
    setFilterTerm(filterForm.toLowerCase())}

  const addName = (event) => {
    event.preventDefault()
    if (persons.filter(p => p.name === newName).length === 0) {
      const newId = (persons[persons.length - 1].id + 1)
      const newPerson = { id: newId, name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
    }
    else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter FilterTerm={filterForm} onFilterChange={writeFilterForm} SetFilter={setFilter} />
      <NewEntry newName={newName} newNumber={newNumber} onTextChange={writeName} onNumberChange={writeNumber} onSubmit={addName} />
      <h2>Numbers</h2>
      <PhoneList entries={persons} filter={filterTerm} />
    </div>
  )
}
export default App
