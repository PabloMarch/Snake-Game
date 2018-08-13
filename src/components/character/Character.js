import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import Icon from '@material-ui/core/Icon'

// Styles
import styles from './styles'

// Presentational
const Character = props => (
  <Fragment>
    {props.body.map((item, key) =>
      <Icon
        key={key}
        className={props.classes.body}
        style={Object.assign({}, props.style, { left: item.x, top: item.y })}
      />
    )}
  </Fragment>
)

// Props
Character.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  body: PropTypes.array.isRequired
}

export default withStyles(styles)(Character)
