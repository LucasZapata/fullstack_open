import React from 'react'

const SingleCountry = ({country}) =>{
    if (country === '')
        return(null)
    return(
    <div>
        <h1>{country.name.official}</h1>
        <p>population {country.population}</p>
        <p>capital {country.capital[0]}</p>
        <h2>languages</h2>
        <ul>
            {Object.keys(country.languages).forEach(lang => <li key={lang}>{country.languages.lang}</li>)}
        </ul>
        <img src={country.flags.svg} width = {400} alt = {'Flag'}/>
    </div>)

}

export default SingleCountry