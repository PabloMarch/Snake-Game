import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'

// Components
import styles from './styles'

// Presentational
const Item = props => (
  <div className={props.classes.root}>
    <Icon>bug_report</Icon>
  </div>
)

// Props
Item.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Item)
