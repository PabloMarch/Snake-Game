import React, { Component, Fragment } from 'react'
import { hot } from 'react-hot-loader'
import CssBaseline from '@material-ui/core/CssBaseline'

// Components
import Scene from './scene'
import ScoreBoard from './score-board'
import Character from './character'
import Item from './item'

class Game extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <ScoreBoard />
        <Scene>
          <Character />
          <Item />
        </Scene>
      </Fragment>
    )
  }
}

export default hot(module)(Game)
