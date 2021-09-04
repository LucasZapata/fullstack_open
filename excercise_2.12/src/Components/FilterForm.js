import React from 'react'

const FilterForm = ({text, onTextChange}) => {
    return(
        <div>
        <input value = {text} onChange = {onTextChange}/>
        </div>
    )
}

export default FilterForm