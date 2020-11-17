import React from 'react'
import { useSelector } from 'react-redux'
import { MyTable } from './CustomTable'

const ShirtList = () => {
  const shirts = useSelector(state => state.items.shirts)
  const manufacturers = useSelector(state => state.manufacturers)
  if (!shirts || !manufacturers) return <div>error?</div>
  if(Object.keys(manufacturers).length === 0) return <div>loading ...</div>

  const maxLen = shirts.length < 20 ? shirts.length : 20

  return (
    <div><h2>Showing first {maxLen} result out of {shirts.length}</h2>
      <MyTable items={shirts.slice(0, maxLen)} manufacturers={manufacturers} maxLen={maxLen} />
    </div>
  )
}


export default ShirtList