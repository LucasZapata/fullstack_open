import React from 'react'

const SingleCountry = ({country}) =>{
    if (country === '')
        return(null)
    return(
    <div>
        <h1>{country.name}</h1>
        <p>population {country.population}</p>
        <p>capital {country.capital}</p>
        <h2>languages</h2>
        <ul>
            {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={country.flag} width = {400} alt = {'Flag'}/>
    </div>)

}

export default SingleCountry