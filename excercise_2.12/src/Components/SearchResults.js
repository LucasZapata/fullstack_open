import React, {useState} from 'react'
import CountryList from './CountryList'
import SingleCountry from './SingleCountry'

const SearchResults = ({list, term, maxResults}) =>{
    
    const [displaySingle, setDisplaySingle] = useState('')

    const ApplyFilter = (list, term) =>{
        if ((term === '')){
            return('')}
        term = term.toLowerCase()
        const result = list.filter(country => country.name.toLowerCase().startsWith(term))
        
        return(result)
    }

    const displaySingleCountry = (country) =>{
        console.log(country)
        if (displaySingle !== country){
            setDisplaySingle(country)}
        console.log(displaySingle)
        return(null)
        }
    
    
    const result = (list, term, maxResults) =>
        {const results = ApplyFilter(list, term)
        if (results === '')
            {return('')}
        else if (results.length > maxResults)
            {return(<div><p>Too many matches, specify another filter</p></div>)}
        else if (results.length > 1){
            return(<CountryList countries = {results} singleDisplay = {displaySingleCountry}/>)}
        else {
            displaySingleCountry(results[0])
            return('')
        }}
    
    
    return(<div>{result(list, term, maxResults)}
    {<SingleCountry country = {displaySingle}/>}</div>)
}

export default SearchResults