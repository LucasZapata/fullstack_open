const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let new_state = {...state}
  switch (action.type) {
    case 'GOOD':
      new_state.good = new_state.good +1
      return new_state
    case 'OK':
      new_state.ok = new_state.ok +1
      return new_state
    case 'BAD':
      new_state.bad = new_state.bad +1
      return new_state
    case 'ZERO':
      return initialState
    default:
      return new_state
  }
  
}

export default counterReducer