import React, { Component } from 'react'
import { connect } from 'react-redux';

// Actions
// import { } from 'src/store/vehicles-list/actions'

// Presentational
import Scene from './Scene'

// Container
class SceneContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return <Scene {...this.props} />
  }
}

export default connect(
  ({ scene }) => ({ scene }),
  // { actionsHere }
)(SceneContainer)
