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
    const user = this.props.auth
    const questions = this.props.userQuestions
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
          { questions.map(userQuestion =>
            <TableRow>
              <TableRowColumn>{userQuestion.question.name}</TableRowColumn>
              <TableRowColumn>{userQuestion.question.category.name}</TableRowColumn>
              <TableRowColumn>{userQuestion.question.difficulty.level}</TableRowColumn>
              <TableRowColumn>{userQuestion.status}</TableRowColumn>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, userQuestions }) => ({ auth, userQuestions })
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)
