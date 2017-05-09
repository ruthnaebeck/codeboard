import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import { Link } from 'react-router'

import { fetchQuestion } from '../reducers/question'

export class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = { open: this.props.drawer }
  }

  handleToggle = () => this.setState({ open: !this.state.open })
  handleNav = (evt, id) => this.props.fetchQuestion(id)

  render() {
    return (
      <Card>
        <CardMedia
          overlay={<CardTitle title="Welcome to Code Board!" subtitle="" />}>
          <div className="splash row"
            style={{ backgroundImage: 'url(/images/pen-marker-hand.png)' }}>
            <div className="col-sm-12 started">
              <RaisedButton
                label="Get Started"
                primary={true}
                onTouchTap={this.handleToggle} />
              <Drawer open={this.state.open}>
              <AppBar
              title="Questions"
              iconElementLeft={<span/>}
              />
              <h4>By Category:</h4>
              <Divider />
              {this.props.categories.map(category =>
                <ListItem
                  key={category.id}
                  primaryText={category.name}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                  nestedItems={
                    category.questions.map(question =>
                      <ListItem
                      containerElement={<Link to="/popup"/>}
                      key={question.id}
                      primaryText={question.name}
                      onTouchTap={(evt) => this.handleNav(evt, question.id)}
                      />
                    )
                  }
                  >
                </ListItem>
              )}
              <br/>
              <br/>
              <h4>By Difficulty:</h4>
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
                      containerElement={<Link to="/popup"/>}
                      key={question.id}
                      primaryText={question.name}
                      onTouchTap={(evt) => this.handleNav(evt, question.id)}
                      />
                    )
                  }
                  >
                </ListItem>
              )}
              </Drawer>
            </div>
          </div>
        </CardMedia>
      </Card>
    )
  }
}

const mapStateToProps = ({categories, difficulties, drawer}) => ({categories, difficulties, drawer})
const mapDispatchToProps = { fetchQuestion }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
