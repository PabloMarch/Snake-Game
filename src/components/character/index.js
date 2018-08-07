import React, { Component } from 'react'
import { connect } from 'react-redux'

// Presentational
import Character from './Character'

class CharacterContainer extends Component {
  render () {
    return <Character {...this.props} />
  }
}

export default connect(
  ({ character }) => ({ character })
)(CharacterContainer)
