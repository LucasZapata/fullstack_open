import React, { useEffect, useState } from 'react'
import NetworkComm from './components/NetworkComm.js'
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
    const dbData = NetworkComm.GetDB().then(data => setPersons(data))}, [])

  const writeName = (event) => setNewName(event.target.value)
  const writeNumber = (event) => setNewNumber(event.target.value)
  const writeFilterForm = (event) => setFilterForm(event.target.value)
  const setFilter = (event) => {
    event.preventDefault()
    setFilterTerm(filterForm.toLowerCase())}

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber }
    const existingData = persons.find(n => n.name === newName)
    console.log(existingData)
    if (existingData === undefined) {
      const dbData = NetworkComm.AddDB(newPerson).then(data => setPersons(persons.concat(data)))
    }
    else if (existingData.number !== newPerson.number){
      const confirmation = window.confirm(`Change number for ${newName}?`)
      if (confirmation){
      const dbData = NetworkComm.EditDB(existingData.id, newPerson).then(data => {
        setPersons(persons.map(p => p.id !== existingData.id ? p: data))}) 
      }
    }
    else
      {window.alert(`${newName}, number ${newNumber}, is already added to phonebook.`)}
  }

  const deletePerson = (personId, personName) => {
    const confirmation = window.confirm(`Delete entry ${personName}?`)
    if (confirmation){
      const dbData = NetworkComm.RemoveDB(personId).then(setPersons(persons.filter(p => p.id !== personId)))     
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter FilterTerm={filterForm} onFilterChange={writeFilterForm} SetFilter={setFilter} />
      <NewEntry newName={newName} newNumber={newNumber} onTextChange={writeName} onNumberChange={writeNumber} onSubmit={addName} />
      <h2>Numbers</h2>
      <PhoneList entries={persons} filter={filterTerm} deleteEntry={deletePerson} />
    </div>
  )
}
export default App
