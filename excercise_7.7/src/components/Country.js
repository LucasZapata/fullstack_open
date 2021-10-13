import React from "react"

const Country = ({ country }) => {
    console.log(country)
    if (!country) {
      console.log('1')
      return null
    }
  
    if (!country.found) {
      console.log(!country.found)
      return (
        <div>
          not found...
        </div>
      )
    }
  
    return (
      <div>
        <h1>{country.data.name.official}</h1>
        <p>population {country.data.population}</p>
        <p>capital {country.data.capital[0]}</p>
        <h2>languages</h2>
        <ul>
            {Object.keys(country.data.languages).forEach(lang => <li key={lang}>{country.data.languages.lang}</li>)}
        </ul>
        <img src={country.data.flags.svg} width = {400} alt = {'Flag'}/>
      </div>
    )
  }

export default Country