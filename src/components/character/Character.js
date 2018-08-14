import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import Icon from '@material-ui/core/Icon'

// Styles
import styles from './styles'

// Presentational
const Character = props => (
  <section className={props.classes.charBody}>
    {props.body.map((item, key) =>
      <Icon
        key={key}
        className={props.classes.charBlock}
        style={Object.assign({}, props.style, { left: item.x, top: item.y })}
      />
    )}
  </section>
)

// Props
Character.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  body: PropTypes.array.isRequired
}

export default withStyles(styles)(Character)
