import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import LooksOne from 'material-ui/svg-icons/image/looks-one'
import LooksTwo from 'material-ui/svg-icons/image/looks-two'
import Looks3 from 'material-ui/svg-icons/image/looks-3'
import Looks4 from 'material-ui/svg-icons/image/looks-4'
import Looks5 from 'material-ui/svg-icons/image/looks-5'
import { Link } from 'react-router'

import { setId } from '../reducers/question'

export class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openLeft: this.props.drawer,
      openRight: false
    }
  }

  handleLeftToggle = () => this.setState({ openLeft: !this.state.openLeft })
  handleRightToggle = () => this.setState({ openRight: !this.state.openRight })
  handleNav = (evt, id) => this.props.setId(id)

  render() {
    const tilesData = [
      {
        img: '/images/screenshot.png',
        title: 'Select question by category or difficulty',
        button: <LooksOne color='white'/>
      },
      {
        img: '/images/screenshot.png',
        title: 'App speaks the question prompt',
        button: <LooksTwo color='white'/>
      },
      {
        img: '/images/screenshot.png',
        title: 'Code with whiteboard and text editor',
        button: <Looks3 color='white'/>
      },
      {
        img: '/images/screenshot.png',
        title: 'Ask for hints and test your code',
        button: <Looks4 color='white'/>
      },
      {
        img: '/images/screenshot.png',
        title: 'Sign in to save your work',
        button: <Looks5 color='white'/>
      }
    ]
    return (
      <Card>
        <CardMedia
          overlay={<CardTitle title="Welcome to Code Board!" subtitle="" />}>
          <div className="splash row"
            style={{ backgroundImage: 'url(/images/woman_coding.jpg)' }}>
            <div className="col-sm-12 started">
              <RaisedButton
                label="Get Started"
                primary={true}
                onTouchTap={this.handleLeftToggle}
                style={{margin: 8}} />
              <RaisedButton
                label="How To Use"
                primary={true}
                onTouchTap={this.handleRightToggle}
                style={{margin: 8}} />
              <Drawer open={this.state.openLeft}>
              <AppBar
              title="Questions"
              iconElementLeft={<span/>}
              />
              <h4>By Category:</h4>
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
              <Drawer width={ '25%' } openSecondary={true} open={this.state.openRight} >
              <AppBar
                title="How To Use"
                showMenuIconButton={ false }
              />
              <div>
                <div style={{margin: '20px'}}>
                  <h4 style={{textAlign: 'left'}}>Code Board helps developers prepare for the technical portion of interviews</h4>
                </div>
                <GridList
                  cellHeight={150}
                  cols={1}
                  padding={10}
                  style={{margin: 20}}
                >
                {tilesData.map((tile) => (
                  <GridTile
                    actionIcon={<IconButton>{tile.button}</IconButton>}
                    key={tile.title}
                    title={tile.title}
                    titlePosition='top'
                    titleStyle={{fontSize: '97%', textAlign: 'left'}}
                    actionPosition='left'
                    style={{borderStyle: 'solid', borderWidth: '2px'}}
                    titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                    <img src={tile.img} />
                  </GridTile>
                ))}
              </GridList>
              </div>
              </Drawer>
            </div>
          </div>
        </CardMedia>
      </Card>
    )
  }
}

const mapStateToProps = ({categories, difficulties, drawer}) =>
  ({categories, difficulties, drawer})
const mapDispatchToProps = { setId }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
