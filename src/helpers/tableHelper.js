import React from 'react'
import { MyRow } from '../components/CustomTable'

const parser = new DOMParser()
const generateRows = (items, man) => items.map(
  i => {
    const availability = man[i.manufacturer] ? man[i.manufacturer][(i.id).toUpperCase()] : null
    if (availability){
      const xml = parser.parseFromString(availability,'text/xml').getElementsByTagName('INSTOCKVALUE')[0].childNodes[0].nodeValue
      return (<MyRow key={i.id} item={i} availability={xml} />)
    }
    return( <MyRow key={i.id} item={i} availability={'loading'} />)
  }
)

export default generateRows