import React, { useEffect, useState } from 'react'
//import warehouseService from './services/warehouse'
import JacketList from './components/JacketList'

import { Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItems } from './reducers/itemReducer'
import { fetchAvailability } from './reducers/manufacturerReducer'
import ShirtList from './components/ShirtList'
import AccessoryList from './components/AccessoryList'




const App = () => {
  const [loadItems, setLoadItems] = useState(true)
  const [loadAvailability, setLoadAvailability] = useState(true)
  //const [manufacturers, setManufacturers] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    if(loadItems){
      console.log('load items')
      dispatch(fetchItems('jackets'))
      dispatch(fetchItems('shirts'))
      dispatch(fetchItems('accessories'))
      setLoadItems(false)
    }
  },[dispatch, loadItems])

  const items = useSelector(state => state.items)

  //const manufacturers = useSelector(state => state.manufacturers)


  useEffect(() => {
    if(loadAvailability && items.manufacturers) {
      console.log('hit')
      const m = items.manufacturers
      m.forEach(manufacturer => dispatch(fetchAvailability(manufacturer)))
      setLoadAvailability(false)
    }

  },[dispatch, items.manufacturers, loadAvailability])

  useEffect(() => {
    setInterval(() => {
      console.log('update all')
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
          <JacketList />
        </Route>
        <Route path='/shirts'>
          <ShirtList />
        </Route>
        <Route path='/accessories'>
          <AccessoryList />
        </Route>
      </Switch>
    </div>
  )
}

export default App
