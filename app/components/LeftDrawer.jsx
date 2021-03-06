import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'

import {close} from '../reducers/drawer'

export const LeftDrawer = (props) => {

  return (
    <div className="drawer">
      <Drawer open={props.drawer} docked={false} onRequestChange={() => props.close()}>
        <AppBar
          title="Questions"
          iconElementLeft={<span />}
        />
        <h3 className='drawerHeading'>Category</h3>
        <Divider />
        {props.categories.map((category, index) =>
          <ListItem
            key={category.id}
            primaryText={category.name}
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={
              category.questions.map(question =>
                <ListItem
                  onTouchTap={props.close}
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
        <h3 className='drawerHeading'>Difficulty</h3>
        <Divider />
        {props.difficulties.map((difficulty, index) =>
          <ListItem
            key={difficulty.id}
            primaryText={difficulty.level}
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={
              difficulty.questions.map(question =>
                <ListItem
                  onTouchTap={props.close}
                  containerElement={<Link to={`/question/${question.id}`} />}
                  key={question.id}
                  secondaryText={question.name}
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

const mapStateToProps = ({categories, difficulties, drawer}) =>
  ({categories, difficulties, drawer})
const mapDispatchToProps = { close }

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer)
