import React from 'react'

const PhoneList = ({entries, filter}) =>{
    const result = () => {
        let res = entries
        if (filter !==  ''){
            res = entries.filter(entry => entry.name.toLowerCase() === filter)}
        return(res)
        }
        
    return(
     <ul>
         {result().map(entry => <li key = {entry.id}>{entry.name} {entry.phone}</li>)}
    </ul>)
}

export default PhoneList