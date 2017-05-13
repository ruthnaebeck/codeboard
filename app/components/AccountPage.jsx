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
      nameOrder: upArrow,
      categoryOrder: null,
      difficultyOrder: null,
      statusOrder: null
    }
  }
  nameSort(questions) {
    let newNameOrder, sortedByName
    switch (this.state.nameOrder) {
    case upArrow:
      newNameOrder = downArrow
      sortedByName = questions.reverse()
      break
    case downArrow:
      newNameOrder = upArrow
      sortedByName = questions.reverse()
      break
    default:
      newNameOrder = upArrow
      sortedByName = questions.sort((a, b) => a.question.name < b.question.name ? -1 : 1)
    }
    this.setState({ questions: sortedByName, nameOrder: newNameOrder, categoryOrder: null, difficultyOrder: null, statusOrder: null })
  }
  categorySort(questions) {
    let newCategoryOrder, sortedByCategory
    switch (this.state.nameOrder) {
    case upArrow:
      newCategoryOrder = downArrow
      sortedByCategory = questions.reverse()
      break
    case downArrow:
      newCategoryOrder = upArrow
      sortedByCategory = questions.reverse()
      break
    default:
      newCategoryOrder = upArrow
      sortedByCategory = questions.sort((a, b) => a.question.category.name < b.question.category.name ? -1 : 1)
    }
    this.setState({ questions: sortedByCategory, categoryOrder: newCategoryOrder, nameOrder: null, difficultyOrder: null, statusOrder: null })
  }
  difficultySort(questions) {
    const easy = questions.filter(question => question.question.difficulty.level === 'Easy'),
    medium = questions.filter(question => question.question.difficulty.level === 'Medium'),
    hard = questions.filter(question => question.question.difficulty.level === 'Hard')
    let newDifficultyOrder, sortedByDifficulty
    switch (this.state.difficultyOrder) {
    case upArrow:
      newDifficultyOrder = downArrow
      sortedByDifficulty = questions.reverse()
      break
    case downArrow:
      newDifficultyOrder = upArrow
      sortedByDifficulty = questions.reverse()
      break
    default:
      newDifficultyOrder = upArrow
      sortedByDifficulty = easy.concat(medium).concat(hard)
    }
    this.setState({ questions: sortedByDifficulty, difficultyOrder: newDifficultyOrder, nameOrder: null, statusOrder: null, categoryOrder: null })
  }
  statusSort(questions) {
    let newStatusOrder, sortedByStatus
    switch (this.state.statusOrder) {
    case upArrow:
      newStatusOrder = downArrow
      sortedByStatus = questions.reverse()
      break
    case downArrow:
      newStatusOrder = upArrow
      sortedByStatus = questions.reverse()
      break
    default:
      newStatusOrder = downArrow
      sortedByStatus = questions.sort((a, b) => a.status < b.status ? 1 : -1)
    }
    this.setState({ questions: sortedByStatus, statusOrder: newStatusOrder, difficultyOrder: null, nameOrder: null, categoryOrder: null })
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
                  <TableHeaderColumn>
                    <FlatButton icon={this.state.nameOrder} onTouchTap={() => this.nameSort(questions)}>Question Name</FlatButton>
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ paddingLeft: '5px' }}>
                    <FlatButton icon={this.state.categoryOrder} onTouchTap={() => this.categorySort(questions)}>Category</FlatButton>
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ paddingLeft: '5px' }}>
                    <FlatButton icon={this.state.difficultyOrder} onTouchTap={() => this.difficultySort(questions)}>Difficulty</FlatButton>
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ paddingLeft: '0px' }}>
                    <FlatButton icon={this.state.statusOrder} onTouchTap={() => this.statusSort(questions)}>Status</FlatButton>
                  </TableHeaderColumn>
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
