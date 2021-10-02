import anecdotesService from '../services/anecdotes' 

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] */

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type){
    case 'VOTE' :
      const updatedAnecdote = action.obj
      return state.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
    case 'ADD' : 
      return state.concat(action.obj)
    case 'INIT_DATA':
      return action.data
    default: return state
  }
}

export const voteAction = (targetAnecdote) => {
  return async dispatch => {
    const updatedAnecdote = {...targetAnecdote, votes : targetAnecdote.votes+1}
    await anecdotesService.update(updatedAnecdote)
    dispatch({type:'VOTE', obj:updatedAnecdote})
  }
}

export const addAnecdote = (text) => {
  return async dispatch => {
    const newAnecdote = asObject(text)
    await anecdotesService.addNew(newAnecdote)
    dispatch({type:'ADD', obj:newAnecdote})
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const initList = await anecdotesService.getAll()
    dispatch({type:'INIT_DATA', data:initList})
  }
  //{type:'INIT_DATA', data:initList}
}

export default reducer