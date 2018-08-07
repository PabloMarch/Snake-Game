import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import styles from './styles'

// Presentational
const Scene = (props) => (
  <div className={props.classes.root}>GAME SCENE</div>
)

// Props
Scene.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Scene)
