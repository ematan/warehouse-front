import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import itemReducer from './reducers/itemReducer'
import manufacturerReducer from './reducers/manufacturerReducer'

const reducer = combineReducers({
  items: itemReducer,
  manufacturers: manufacturerReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store