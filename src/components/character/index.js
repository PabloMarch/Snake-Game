import React, { Component } from 'react'
import { connect } from 'react-redux'

// Context
import { SceneContext } from 'components/scene'

// Presentational
import Character from './Character'

class CharacterContainer extends Component {
  render () {
    return(
      <SceneContext.Consumer>
        {({ animationInterval }) => <Character body={this.props.character.body} style={{}} />}
      </SceneContext.Consumer>
    )
  }
}

export default connect(
  ({ character }) => ({ character })
)(CharacterContainer)
