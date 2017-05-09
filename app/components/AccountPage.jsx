import React from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader } from 'material-ui/Card'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { Link } from 'react-router'

class AccountPage extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    return (
      <div>
      <Card>
        <CardHeader
          title="Name" // will be dynamic according to the logged in user
          subtitle="Email"
        />
      </Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Question Name</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>Difficulty</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Completed</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)
