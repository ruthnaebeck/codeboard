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
import UpArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'

const upArrow = <UpArrow />
const downArrow = <DownArrow />

class AccountPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      nameOrder: 'asc',
      categoryOrder: '',
      difficultyOrder: '',
      statusOrder: ''
    }
  }
  nameSort(questions) {
    const sortedByName = this.state.nameOrder === 'asc' ? questions.reverse() : questions.sort((a, b) => a.question.name < b.question.name ? -1 : 1)
    this.setState({ questions: sortedByName, nameOrder: '^' })
  }
  categorySort(questions) {
    const sortedByCategory = questions.sort((a, b) => a.question.category.name < b.question.category.name ? -1 : 1)
    this.setState({ questions: sortedByCategory })
  }
  difficultySort(questions) {
    const easy = questions.filter(question => question.question.difficulty.level === 'Easy'),
    medium = questions.filter(question => question.question.difficulty.level === 'Medium'),
    hard = questions.filter(question => question.question.difficulty.level === 'Hard')
    this.setState({ questions: easy.concat(medium).concat(hard) })
  }
  statusSort(questions) {
    const sortedByStatus = questions.sort((a, b) => a.status > b.status ? -1 : 1)
    this.setState({ questions: sortedByStatus })
  }

  render() {
    const user = this.props.auth || {}
    let questions
    if (this.state.questions.length > 0) questions = this.state.questions
    else if (this.props.userQuestions) questions = this.props.userQuestions
    else questions = []
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
                  <TableHeaderColumn><FlatButton icon={upArrow} onTouchTap={() => this.nameSort(questions)}>Question Name</FlatButton></TableHeaderColumn>
                  <TableHeaderColumn><FlatButton onTouchTap={() => this.categorySort(questions)}>Category</FlatButton></TableHeaderColumn>
                  <TableHeaderColumn><FlatButton onTouchTap={() => this.difficultySort(questions)}>Difficulty</FlatButton></TableHeaderColumn>
                  <TableHeaderColumn><FlatButton onTouchTap={() => this.statusSort(questions)}>Status</FlatButton></TableHeaderColumn>
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
