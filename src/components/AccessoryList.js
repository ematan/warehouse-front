import React from 'react'
import { useSelector } from 'react-redux'
import { MyTable } from './CustomTable'

const AccessoryList = () => {
  const accessories = useSelector(state => state.items.accessories)
  const manufacturers = useSelector(state => state.manufacturers)
  if (!accessories || !manufacturers) return <div>error?</div>
  if(Object.keys(manufacturers).length === 0) return <div>loading ...</div>

  const maxLen = accessories.length < 20 ? accessories.length : 20

  return (
    <div><h2>Showing first {maxLen} result out of {accessories.length}</h2>
      <MyTable items={accessories.slice(0, maxLen)} manufacturers={manufacturers} maxLen={maxLen} />
    </div>
  )
}

export default AccessoryList