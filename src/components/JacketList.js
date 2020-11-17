import React from 'react'
import { useSelector } from 'react-redux'
import { MyTable } from './CustomTable'

const JacketList = () => {
  const jackets = useSelector(state => state.items.jackets)
  const manufacturers = useSelector(state => state.manufacturers)
  if (!jackets || !manufacturers) return <div>error?</div>
  if(Object.keys(manufacturers).length === 0) return <div>loading ...</div>

  const maxLen = jackets.length < 20 ? jackets.length : 20

  return (
    <div><h2>Showing first {maxLen} result out of {jackets.length}</h2>
      <MyTable items={jackets.slice(0, maxLen)} manufacturers={manufacturers} />
    </div>
  )
}


export default JacketList