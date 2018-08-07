import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import styles from './styles'

// Presentational
const Character = (props) => (
  <div className={props.classes.root}>SNAKE</div>
)

// Props
Character.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Character)
