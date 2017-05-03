import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'

export const Home = (props) => (
    <Card>
      <CardMedia
        overlay={<CardTitle title="Welcome to Code Board!" subtitle="" />}>
        <center><RaisedButton label="Get Started" /></center>
        <img src="/images/pen-marker-hand.png" />
      </CardMedia>
    </Card>
  )

const mapStateToProps = null
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Home)
