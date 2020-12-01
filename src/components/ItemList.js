import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MyTable } from './CustomTable'
import PropTypes from 'prop-types'
import { Input, Select, Divider, Header, Loader, Segment, Container } from 'semantic-ui-react'
import mapAvailability from '../helpers/tableHelper'
import { useField } from '../helpers/customHooks'

const ItemList = ({ itemCategory }) => {
  const items = useSelector(state => state.items[itemCategory])
  const manufacturers = useSelector(state => state.manufacturers)

  const id = useField('text')
  const name = useField('text')
  const color = useField('text')
  const minPrice = useField('number')
  const maxPrice = useField('number')
  const showedAmount = useField('number')
  const [availability, setAvailability] = useState(null)
  const [maker, setMaker] = useState(null)
  const [mapped, setMapped] = useState(items)

  useEffect(() => {
    if (items && manufacturers) {
      setMapped(mapAvailability(items, manufacturers))
    }
  }, [manufacturers, items])

  if(!items || !manufacturers || Object.keys(manufacturers).length === 0){
    return (
      <Segment vertical>
        <Loader active inline='centered'>Loading</Loader>
      </Segment>
    )
  }

  const makerOptions = Object.keys(manufacturers).map(m => {
    return {
      value: m.toLowerCase(),
      text: m
    }
  })

  const maxLen = showedAmount.value === '' ? 20 : Number(showedAmount.value)

  const availabilityOptions = Array
    .from(new Set(mapped.filter(i => i.availability).map(i => i.availability)))
    .map(o => {
      return {
        value: o.toLowerCase(),
        text: o
      }
    })

  const filtered = mapped.filter(i => {
    const idMatch = i.id.toLowerCase().includes(id.value)
    const nameMatch = i.name.toLowerCase().includes(name.value)
    const colorMatch = (i.color.includes(color.value) || color.value === '')
    const manufacturerMatch = (!maker || i.manufacturer.toLowerCase() === maker)
    const minPriceMatch = (minPrice.value === '' || Number(i.price) >= Number(minPrice.value))
    const maxPriceMatch = (maxPrice.value === '' || Number(i.price) <= Number(maxPrice.value))

    const result = (
      idMatch && nameMatch && colorMatch &&
      manufacturerMatch && minPriceMatch && maxPriceMatch
    )
    if (result && availability && i.availability) {
      return i.availability.toLowerCase() === availability
    }
    return result
  })
  const padding = {
    padding: 5
  }

  return (
    <div>
      <Divider horizontal>
        <Header as='h4'>
          Filters
        </Header>
      </Divider>
      <Container>
        <Input style={padding} label='id' {...id} />
        <Input style={padding} label='name' {...name} />
        <Input style={padding} label='color' {...color} />
        <Input style={padding} label='minPrice' {...minPrice} />
        <Input style={padding} label='maxPrice' {...maxPrice} />
        <Select
          options={ [...makerOptions, { value: null, text: 'any' }]}
          placeholder='Select a manufacturer...'
          onChange={(e, data) => setMaker(data.value)}
        />
        <Select
          options={ [...availabilityOptions, { value: null, text: 'any' }]}
          placeholder='Filter by availability...'
          onChange={(e, data) => setAvailability(data.value)}
        />


      </Container>
      <h4>Showing first <Input placeholder={maxLen} {...showedAmount} /> results out of {items.length}</h4>
      <MyTable items={filtered.slice(0, maxLen)} manufacturers={manufacturers} />
    </div>
  )
}

ItemList.propTypes = {
  itemCategory: PropTypes.string,
}


export default ItemList