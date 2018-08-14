import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'

// Components
import styles from './styles'

// Presentational
const Item = props => (
  <Icon
    ref={props.itemRef}
    className={props.classes.root}
    style={Object.assign({}, props.style, { left: props.position.x, top: props.position.y })}
  />
)

// Props
Item.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
}

export default withStyles(styles)(Item)
