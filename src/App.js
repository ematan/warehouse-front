import React, { useEffect, useState } from 'react'

import { Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItems } from './reducers/itemReducer'
import { fetchAvailability } from './reducers/manufacturerReducer'
import ItemList from './components/ItemList'

const App = () => {
  const [loadItems, setLoadItems] = useState(true)
  const [loadAvailability, setLoadAvailability] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    if(loadItems){
      dispatch(fetchItems('jackets'))
      dispatch(fetchItems('shirts'))
      dispatch(fetchItems('accessories'))
      setLoadItems(false)
    }
  },[dispatch, loadItems])

  const items = useSelector(state => state.items)

  useEffect(() => {
    if(loadAvailability && items.manufacturers) {
      const m = items.manufacturers
      m.forEach(manufacturer => dispatch(fetchAvailability(manufacturer)))
      setLoadAvailability(false)
    }

  },[dispatch, items.manufacturers, loadAvailability])

  useEffect(() => {
    setInterval(() => {
      setLoadItems(true)
      setLoadAvailability(true)
    }, 5*60*1000)
  }, [])

  const padding = {
    padding: 5
  }

  return (
    <div>
      <h1>Warehouse</h1>
      <div>
        <Link style={padding} to="/jackets">jackets</Link>
        <Link style={padding} to="/shirts">shirts</Link>
        <Link style={padding} to="/accessories">accessories</Link>
      </div>


      <Switch>
        <Route path='/jackets'>
          <ItemList itemCategory='jackets'/>
        </Route>
        <Route path='/shirts'>
          <ItemList itemCategory='shirts'/>
        </Route>
        <Route path='/accessories'>
          <ItemList itemCategory='accessories'/>
        </Route>
      </Switch>
    </div>
  )
}

export default App
