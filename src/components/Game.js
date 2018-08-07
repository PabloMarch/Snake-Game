import React, { Component, Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

// Components
import Scene from './scene';

class Game extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Scene />
      </Fragment>
    )
  }
}

export default Game;
