import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import generateRows from '../helpers/tableHelper'

const MyTable = ({ items, manufacturers }) => {

  const rows = generateRows(items, manufacturers)

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
      <Table.Cell>{availability? availability : 'Loading...' }</Table.Cell>
    </Table.Row>
  )
}
MyRow.propTypes = {
  item: PropTypes.object,
  availability: PropTypes.string
}

export { MyRow, MyHeader, MyTable }