import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

// Components
import styles from './styles'

// Presentational
const Subscribe = props => (
  <Grid container className={props.classes.root} alignItems="center">
    <Grid item xs={12}>
      <h2>Subscribe and Win!</h2>
      <p>wanna rank in scoreboard and win prizes for first places?</p>
    </Grid>
    <Grid item xs={12} className={props.classes.ctaWrapper}>
      <Button
        color="primary"
        className={props.classes.button}
        variant={props.isSubscribing ? 'contained' : 'outlined'}
        onClick={props.onSubscribe}
      >
        {props.isSubscribing ? 'subscribing...' : 'subscribe'}
      </Button>
      <Button
        className={props.classes.button}
        variant="outlined"
        onClick={props.onClose}
      >
        Play
      </Button>
    </Grid>
  </Grid>
)

// Props
Subscribe.propTypes = {
  classes: PropTypes.object.isRequired,
  // onClose: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired
}

export default withStyles(styles)(Subscribe)
