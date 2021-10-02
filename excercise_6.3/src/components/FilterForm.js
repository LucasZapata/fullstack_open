import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { changeFilter } from "../reducers/filterReducer"

const FilterForm = () => {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const updateFilter = (event) => {
        dispatch(changeFilter(event.target.value))
    }

    return(
    <div>
        
            filter <input name ='filterText' value={filter} onChange={updateFilter} />
        
    </div>)
}

export default FilterForm