import React from 'react'
import PropTypes from 'prop-types'
import { Table, Loader } from 'semantic-ui-react'


const MyTable = ({ items }) => {

  const generateRows = (items) => items.map(
    i => {
      return i.availability
        ? <MyRow key={i.id} item={i} availability={i.availability} />
        : <MyRow key={i.id} item={i} availability={'loading'} />
    })

  const rows = generateRows(items)

  return(
    <Table celled>
      <MyHeader />
      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  )
}
MyTable.propTypes = {
  items: PropTypes.array,
  manufacturers: PropTypes.object,
  maxLen: PropTypes.number
}

const MyHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>ID</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Color</Table.HeaderCell>
      <Table.HeaderCell>Manufacturer</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell>Availability</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
)

const MyRow = ({ item, availability }) => {
  return(
    <Table.Row key={item.id}>
      <Table.Cell>{item.id}</Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.color}</Table.Cell>
      <Table.Cell>{item.manufacturer}</Table.Cell>
      <Table.Cell>{item.price}</Table.Cell>
      <Table.Cell>{availability!=='loading'? availability : <Loader active inline='centered' size='mini'></Loader> }</Table.Cell>
    </Table.Row>
  )
}
MyRow.propTypes = {
  item: PropTypes.object,
  availability: PropTypes.string
}

export { MyRow, MyHeader, MyTable }