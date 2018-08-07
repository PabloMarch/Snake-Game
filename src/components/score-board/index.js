import React, { Component } from 'react'
import { connect } from 'react-redux'

// Presentational
import ScoreBoard from './ScoreBoard'

// Container
class ScoreBoardContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return <ScoreBoard {...this.props} />
  }
}

export default connect(
  ({ scoreBoard }) => ({ scoreBoard })
)(ScoreBoardContainer)
