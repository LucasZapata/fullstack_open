import React from 'react'

const CountryList = ({countries, singleDisplay}) =>{
    console.log(countries)
    const res = countries.map((c) => <li key={c.name}>{c.name}</li>)
    console.log(res)
    return(<div><ul>
        {countries.map((c) => <li key={c.name.common}>{c.name.common} <button onClick = {() => singleDisplay(c)}>Display data</button></li>)}
    </ul></div>)
}

export default CountryList