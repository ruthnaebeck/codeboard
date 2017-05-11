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
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
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
        img: 'http://placekitten.com/g/300/300',
        title: 'Breakfast'
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
                <GridList
                  cellHeight={'auto'}
                  cols={'1'}
                >
                <Subheader>December</Subheader>
                {tilesData.map((tile) => (
                  <GridTile
                    key={tile.img}
                    title={tile.title}
                    subtitle={<span>by <b>{'subtitle'}</b></span>}>
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
