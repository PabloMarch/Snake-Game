import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Context
import { SceneContext } from 'components/scene'

// Components
import styles from './styles'

// temporal values
let frameCount = 0

// Presentational
const Character = (props) => (
  <SceneContext.Consumer>
    {({ animationInterval }) => {
      // temporal values
      let sinceStart = (animationInterval / 1000 * 100) / 100 | 0
      let currentFps = Math.round(1000 / (animationInterval / ++frameCount) * 100) / 100

      return <div className={props.classes.root}>{`Elapsed time: ${sinceStart} secs @ ${currentFps} fps.`}</div>
    }}
  </SceneContext.Consumer>
)

// Props
Character.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Character)
