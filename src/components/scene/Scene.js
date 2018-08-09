import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import CircularProgress from '@material-ui/core/CircularProgress'

// Styles
import styles from './styles'

// Presentational
const Scene = (props) => (
  <div className={props.classes.root} tabIndex="0" onKeyDown={props.onKeyDown}>
    {props.isFetching ? <CircularProgress className={props.classes.loader} /> : props.children}

    <footer className={props.classes.detail}>
      {`Elapsed time: ${props.sinceStart} secs @ ${props.currentFps} fps.`}
    </footer>
  </div>
)

// Props
Scene.propTypes = {
  classes: PropTypes.object.isRequired,
  onKeyDown: PropTypes.func.isRequired,
}

export default withStyles(styles)(Scene)
