import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'

export const Home = (props) => (
    <Card>
      <CardMedia
        overlay={<CardTitle title="Welcome to Code Board!" subtitle=""/>}>
        <div className="splash row"
          style={{ backgroundImage: 'url(/images/pen-marker-hand.png)' }}>
          <div className="col-sm-12 started">
            <RaisedButton label="Get Started" primary={true}/>
          </div>
        </div>
      </CardMedia>
    </Card>
  )

const mapStateToProps = null
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Home)
