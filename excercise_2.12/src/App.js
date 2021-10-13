import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FilterForm from './Components/FilterForm.js'
import SearchResults from './Components/SearchResults.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')

  const filterInput = (event) => {
    event.preventDefault()
    setFilterText(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {setCountries(response.data)})},[])
  
  return (
  <div>
    <FilterForm text = {filterText} onTextChange = {filterInput} />
    <SearchResults list = {countries} term = {filterText} maxResults = {10}/>
  </div>)
  }

export default App;
