//import React from 'react'


const parser = new DOMParser()
/*const generateRows = (items, man) => items.map(
  i => {
    const availability = man[i.manufacturer] ? man[i.manufacturer][(i.id).toUpperCase()] : null
    if (availability){
      const xml = parser.parseFromString(availability,'text/xml').getElementsByTagName('INSTOCKVALUE')[0].childNodes[0].nodeValue
      return (<MyRow key={i.id} item={i} availability={xml} />)
    }
    return( <MyRow key={i.id} item={i} availability={'loading'} />)
  }
)*/



const mapAvailability = (items, man) => items.map(
  i => {
    const availability = man[i.manufacturer] ? man[i.manufacturer][(i.id).toUpperCase()] : null
    if (availability){
      const xml = parser.parseFromString(availability,'text/xml').getElementsByTagName('INSTOCKVALUE')[0].childNodes[0].nodeValue
      return { ...i, availability: xml }
    }
    return { ...i, availability: null }
  }
)

export default mapAvailability