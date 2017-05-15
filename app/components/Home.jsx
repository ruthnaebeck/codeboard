import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import { Link } from 'react-router'

import { setId } from '../reducers/question'

const paperStyle = {
  height: 200,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
}

export class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openLeft: this.props.drawer,
      openRight: false
    }
  }

  handleLeftToggle = () => this.setState({ openLeft: !this.state.openLeft, openRight: false })
  handleRightToggle = () => this.setState({ openRight: !this.state.openRight })
  handleNav = (evt, id) => this.props.setId(id)

  render() {
    const tilesData = [
      {
        img: '/images/how-to-1.png',
        title: '1. Select question by category or difficulty'
      },
      {
        img: '/images/how-to-2.png',
        title: '2. App speaks the question prompt'
      },
      {
        img: '/images/how-to-3.png',
        title: '3. Code with whiteboard and text editor'
      },
      {
        img: '/images/how-to-4.png',
        title: '4. Ask for hints and test your code'
      },
      {
        img: '/images/how-to-5.png',
        title: '5. Sign in to save your work'
      }
    ]
    return (
      <Card>
        <CardMedia
          overlay={<CardTitle title="Practice for your technical interview" subtitle="This app simulates the experience of a technical interview by providing only audio feedback. With practice, this app will help sharpen your acuity and develop the skills to ace your interview. " />}>
          <div className="splash row"
            style={{ backgroundImage: 'url(/images/woman_coding.jpg)' }}>
            <div className="col-sm-12 started">
              <RaisedButton
                label="Get Started"
                primary={true}
                onTouchTap={this.handleLeftToggle}
                style={{margin: 8}} />
              <RaisedButton
                label="How It Works"
                primary={true}
                onTouchTap={this.handleRightToggle}
                style={{margin: 8}} />
              <Drawer open={this.state.openLeft} docked={false} onRequestChange={(open) => this.setState({openLeft: open})}>
              <AppBar
              title="Questions"
              iconElementLeft={<span/>}
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
                      containerElement={<Link to={`/question/${question.id}`}/>}
                      key={question.id}
                      secondaryText={`${question.name} -- ${question.difficulty.level}`}
                      onTouchTap={(evt) => this.handleNav(evt, question.id)}
                      />
                    )
                  }
                  >
                </ListItem>
              )}
              <br/>
              <br/>
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
                      containerElement={<Link to={`/question/${question.id}`}/>}
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
              <Drawer width={ '33%' } openSecondary={true} docked={false} open={this.state.openRight} onRequestChange={(open) => this.setState({openRight: open})} >
                <AppBar
                  title="How It Works"
                  showMenuIconButton={ false }
                />
                <div>
                  <GridList
                    cellHeight={250}
                    cols={1}
                    padding={25}
                    style={{margin: 25}}
                  >
                  {tilesData.map((tile) => (
                    <GridTile
                      icon={<IconButton>{tile.button}</IconButton>}
                      key={tile.title}
                      title={tile.title}
                      titlePosition='top'
                      titleStyle={{fontSize: '1.25em', textAlign: 'left', wordWrap: 'break-word'}}
                      actionPosition='left'
                      style={{borderStyle: 'solid', borderWidth: '2px'}}
                      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                      <img src={tile.img} />
                    </GridTile>
                  ))}
                </GridList>
                </div>
                <RaisedButton
                label="Get Started"
                primary={true}
                onTouchTap={this.handleLeftToggle}
                style={{marginBottom: 20}}
                />
              </Drawer>
            </div>
          </div>
        </CardMedia>
        <CardTitle title="HELLO" />
          <div className="container">
            <div className="row">
              <div className="col-sm-4 col-centered">
                <Paper style={paperStyle} zDepth={1}></Paper>
              </div>
              <div className="col-sm-4 col-centered">
                <Paper style={paperStyle} zDepth={1}></Paper>
              </div>
              <div className="col-sm-4 col-centered">
                <Paper style={paperStyle} zDepth={1}></Paper>
              </div>
            </div>
          </div>
      </Card>
    )
  }
}

const mapStateToProps = ({categories, difficulties, drawer}) =>
  ({categories, difficulties, drawer})
const mapDispatchToProps = { setId }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
