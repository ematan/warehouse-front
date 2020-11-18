import React, { useEffect, useState } from 'react'

import { Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItems } from './reducers/itemReducer'
import { fetchAvailability } from './reducers/manufacturerReducer'
import ItemList from './components/ItemList'
import { Button, Divider, Header, Container, Icon } from 'semantic-ui-react'

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
    'padding-top': '20px',
    'padding-bottom': '5px'
  }

  return (
    <div>
      <Container textAlign='center'>
        <Link to="/"><Header style={padding} as='h1'><Icon name='warehouse' />Warehouse</Header></Link>
      </Container>
      <Divider horizontal>
        <Header as='h4'>
          Product categories
        </Header>
      </Divider>
      <Container textAlign='center'>
        <Link to="/jackets"><Button size='large'>jackets</Button></Link>
        <Link to="/shirts"><Button  size='large'>shirts</Button></Link>
        <Link to="/accessories"><Button size='large'>accessories</Button></Link>
      </Container>


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
