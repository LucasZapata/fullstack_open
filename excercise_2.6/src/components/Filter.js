import React from 'react'

const Filter = ({FilterTerm, onFilterChange, SetFilter}) =>{
    return(
    <form onSubmit = {SetFilter}>
        <div><input value = {FilterTerm} onChange = {onFilterChange}/></div>
        <button type='submit'>Search</button>
    </form>)
}

export default Filter