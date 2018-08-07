import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Bug from '@material-ui/icons/BugReport'

// Components
import styles from './styles'

// Presentational
const Item = (props) => (
  <div className={props.classes.root}>
    <Bug />
  </div>
)

// Props
Item.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Item)
