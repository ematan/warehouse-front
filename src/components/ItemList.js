import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MyTable } from './CustomTable'
import PropTypes from 'prop-types'
import { Input, Select } from 'semantic-ui-react'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}

const ItemList = ({ itemCategory }) => {
  const items = useSelector(state => state.items[itemCategory])
  const manufacturers = useSelector(state => state.manufacturers)

  const id = useField('text')
  const name = useField('text')
  const color = useField('text')
  const minPrice = useField('number')
  const maxPrice = useField('number')
  const [maker, setMaker] = useState(null)


  if (!items || !manufacturers) return <div>error?</div>
  if(Object.keys(manufacturers).length === 0) return <div>loading ...</div>

  const options = Object.keys(manufacturers).map(m => {
    return {
      value: m.toLowerCase(),
      text: m
    }
  })

  const maxLen = items.length < 20 ? items.length : 20

  const filtered = items.filter(i => {
    let result = (
      i.id.toLowerCase().includes(id.value) &&
      i.name.toLowerCase().includes(name.value) &&
      (i.color.includes(color.value) || color.value === '') &&
      (!maker || i.manufacturer.toLowerCase() === maker) &&
      (minPrice.value === '' || Number(i.price) >= Number(minPrice.value)) &&
      (maxPrice.value === '' || Number(i.price) <= Number(maxPrice.value))
    )
    return result
  })
  const padding = {
    padding: 5
  }

  return (
    <div><h2>Showing first {maxLen} result out of {items.length}</h2>
      <div>
        <Input style={padding} label='id' {...id} />
        <Input style={padding} label='name' {...name} />
        <Input style={padding} label='color' {...color} />
        <Input style={padding} label='minPrice' {...minPrice} />
        <Input style={padding} label='maxPrice' {...maxPrice} />
        <Select
          options={ [...options, { value: null, text: 'any' }]}
          placeholder='Select a manufacturer...'
          onChange={(e, data) => setMaker(data.value)}
        />

      </div>
      <MyTable items={filtered.slice(0, maxLen)} manufacturers={manufacturers} />
    </div>
  )
}

ItemList.propTypes = {
  itemCategory: PropTypes.string,
}


export default ItemList