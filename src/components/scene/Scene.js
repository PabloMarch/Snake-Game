import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import styles from './styles'

// Presentational
const Scene = (props) => (
  <div className={props.classes.root} tabIndex="0" onKeyDown={props.onKeyDown}>
    {props.children}
  </div>
)

// Props
Scene.propTypes = {
  classes: PropTypes.object.isRequired,
  onKeyDown: PropTypes.func.isRequired,
}

export default withStyles(styles)(Scene)
