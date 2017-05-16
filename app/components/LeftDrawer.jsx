import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'

export class LeftDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      openLeft: this.props.drawer
    }
  }

  render() {
    return (
      <div>
        <Drawer open={this.props.drawer} docked={false} onRequestChange={(open) => this.setState({ openLeft: open })}>
          <AppBar
            title="Questions"
            iconElementLeft={<span />}
          />
          <h3>Category</h3>
          <Divider />
          {this.props.categories.map((category, index) =>
            <ListItem
              key={category.id}
              primaryText={category.name}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={
                category.questions.map(question =>
                  <ListItem
                    containerElement={<Link to={`/question/${question.id}`} />}
                    key={question.id}
                    secondaryText={`${question.name} -- ${question.difficulty.level}`}
                  />
                )
              }
            >
            </ListItem>
          )}
          <br />
          <br />
          <h3>Difficulty</h3>
          <Divider />
          {this.props.difficulties.map((difficulty, index) =>
            <ListItem
              key={difficulty.id}
              primaryText={difficulty.level}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={
                difficulty.questions.map(question =>
                  <ListItem
                    containerElement={<Link to={`/question/${question.id}`} />}
                    key={question.id}
                    secondaryText={question.name}
                    onTouchTap={(evt) => this.handleNav(evt, question.id)}
                  />
                )
              }
            >
            </ListItem>
          )}
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = ({categories, difficulties, drawer}) =>
  ({categories, difficulties, drawer})
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer)
