import React from 'react'

const NewEntry = ({onSubmit, newName, onTextChange, newNumber, onNumberChange}) => {
    return(
        <form onSubmit = {onSubmit}>
            <div>
                name: <input value = {newName} onChange = {onTextChange}/>
            </div>
            <div>
                name: <input value = {newNumber} onChange = {onNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>)}

export default NewEntry