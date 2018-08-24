import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// Components
import styles from './styles'

// Presentational
const Controls = props => (
  <aside className={props.classes.root}>
    <RadioGroup onChange={props.onChange} value={props.value} className={props.classes.group}>
      <Radio className={props.classes.button} name="control" value="37" />
      <Radio className={props.classes.button} name="control" value="38" />
      <Radio className={props.classes.button} name="control" value="39" />
      <Radio className={props.classes.button} name="control" value="40" />
    </RadioGroup>
  </aside>
)

// Props
Controls.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default withStyles(styles)(Controls)
