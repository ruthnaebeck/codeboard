import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import { Link } from 'react-router'
import LeftDrawer from './LeftDrawer'

import { setId } from '../reducers/question'
import { set } from '../reducers/drawer'

// const paperStyle = {
//   height: '100%',
//   width: '100%',
//   textAlign: 'center',
//   backgroundColor: '#00bcd4'
// }

const whyToUse = ['There are many sites to practice coding problems, but they don’t prepare you for one of the most challenging aspects of technical interviews: hearing the question read aloud instead of reading it on a screen.',
  'Code Board allows you to replicate the experience of listening to the question and hints while you try to code, so you’ll be confident and comfortable in that environment when you go through interviews.',
  'With both a code editor and a virtual whiteboard, Code Board also helps you practice diagramming the problem. It’s your own personal mock interviewer, available to help you practice anytime, anywhere.']

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

export class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openRight: false
    }
  }

  handleRightToggle = () => this.setState({ openRight: !this.state.openRight })
  handleLeftToggle = () => {
    this.props.set()
    this.setState({ openRight: !this.state.openRight })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <Card>
              <CardMedia
                overlay={<CardTitle title="Practice for your JavaScript Technical Interview" subtitle="This app simulates the experience of a technical interview by providing only audio feedback. With practice, this app will help sharpen your acuity and develop the skills to ace your interview. " />}>
                <div className="splash row"
                  style={{ backgroundImage: 'url(/images/woman_coding.jpg)' }}>
                  <div className="col-sm-12 started">
                    <RaisedButton
                      label="Get Started"
                      primary={true}
                      onTouchTap={this.props.set}
                      style={{ margin: 8 }} />
                    <RaisedButton
                      label="How It Works"
                      primary={true}
                      onTouchTap={this.handleRightToggle}
                      style={{ margin: 8 }} />
                    <LeftDrawer />
                    <Drawer width={'33%'} openSecondary={true} docked={false} open={this.state.openRight} onRequestChange={(open) => this.setState({ openRight: open })} >
                      <AppBar
                        title="How It Works"
                        showMenuIconButton={false}
                      />
                      <div>
                        <GridList
                          cellHeight={250}
                          cols={1}
                          padding={25}
                          style={{ margin: 25 }}
                        >
                          {tilesData.map((tile) => (
                            <GridTile
                              icon={<IconButton>{tile.button}</IconButton>}
                              key={tile.title}
                              title={tile.title}
                              titlePosition='top'
                              titleStyle={{ fontSize: '1.25em', textAlign: 'left', wordWrap: 'break-word' }}
                              actionPosition='left'
                              style={{ borderStyle: 'solid', borderWidth: '2px' }}
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
                        style={{ marginBottom: 20 }}
                      />
                    </Drawer>
                  </div>
                </div>
              </CardMedia>
            </Card>
          </div>
        </div>
        <div className="row homeRow">
          {whyToUse.map((reason, i) =>
            <div className="col-sm-4" key={i}>
              <Paper
                key={i}
                className="homePaper"
                style={{backgroundColor: '#00bcd4'}}
                zDepth={4} >
                <h3 style={{ color: 'white', fontWeight: 200, padding: '30px', margin: 0 }}>{reason}</h3>
              </Paper>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories, difficulties, drawer }) =>
  ({ categories, difficulties, drawer })
const mapDispatchToProps = { setId, set }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
