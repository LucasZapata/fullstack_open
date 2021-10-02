import React from "react"
import { connect } from 'react-redux'
import { changeFilter } from "../reducers/filterReducer"

const FilterForm = (props) => {
    const updateFilter = (event) => {
        props.changeFilter(event.target.value)
    }

    return(
    <div>
        
            filter <input name ='filterText' value={props.filter} onChange={updateFilter} />
        
    </div>)
}

const mapStateToProps = (state) =>{
    return {updateFilter: state.updateFilter,
    filter: state.filter}
}

const connectFilter = connect(mapStateToProps, {changeFilter})(FilterForm)

export default connectFilter