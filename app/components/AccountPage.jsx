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
  render() {
    const user = this.props.auth || {}
    const questions = this.props.userQuestions || []
    return (
      <div>
        <Card>
          <CardHeader
            title={user.name || ''}
            subtitle={user.email}
          />
            <Table >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Question Name</TableHeaderColumn>
                  <TableHeaderColumn>Category</TableHeaderColumn>
                  <TableHeaderColumn>Difficulty</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
              { questions.map((userQuestion, idx) =>
                <TableRow key={`${idx}`}>
                  <TableRowColumn>
                    <Link to={`/question/${userQuestion.question_id}`}>
                      {userQuestion.question.name}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn>{userQuestion.question.category.name}</TableRowColumn>
                  <TableRowColumn>{userQuestion.question.difficulty.level}</TableRowColumn>
                  <TableRowColumn>{userQuestion.status}</TableRowColumn>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, userQuestions }) => ({ auth, userQuestions })
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)
