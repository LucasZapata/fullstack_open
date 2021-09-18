import React from 'react'

const PhoneList = ({entries, filter, deleteEntry}) =>{
    const result = () => {
        let res = entries
        if (filter !==  ''){
            res = entries.filter(entry => entry.name.toLowerCase() === filter)}
        return(res)
        }
        
    return(
     <ul>
         {result().map(entry => <li key = {entry.id}>{entry.name} {entry.number} <button onClick={() => deleteEntry(entry.id, entry.name)}>DELETE</button></li>)}
    </ul>)
}

export default PhoneList