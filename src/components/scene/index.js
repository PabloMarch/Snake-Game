import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
// import { } from 'src/store/vehicles-list/actions'

// Presentational
import Scene from './Scene'

// Container
class SceneContainer extends Component {
  constructor (props) {
    super(props)
    this.state = { width: 0, height: 0 }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  render () {
    return <Scene {...this.props} />
  }
}

export default connect(
  ({ scene }) => ({ scene }),
  // { actionsHere }
)(SceneContainer)
