import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'
import AppBar from 'material-ui/AppBar'

export class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  handleToggle = () => this.setState({ open: !this.state.open })

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
              {this.props.questions.map(category =>
                <ListItem
                  key={category.id}
                  primaryText={category.name}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    category.questions.map(question =>
                      <ListItem
                      key={question.id}
                      primaryText={question.name}
                      />
                    )
                  ]}
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

const mapStateToProps = ({questions}) => ({questions})
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Home)
