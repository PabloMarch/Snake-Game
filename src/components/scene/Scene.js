import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import CircularProgress from '@material-ui/core/CircularProgress'

// Styles
import styles from './styles'

// Presentational
const Scene = (props) => (
  <div
    tabIndex="0"
    ref={props.sceneRef}
    className={props.classes.root}
    onKeyDown={e => props.handlers.keyDown(e.keyCode)}
  >
    <section className={props.classes.limits} style={{ height: props.height, width: props.width }}>
      {
        props.isFetching
        ? <CircularProgress className={props.classes.loader} />
        : props.children(props.handlers)
      }
    </section>

    <footer className={props.classes.detail}>
      {`Elapsed time: ${props.sinceStart} secs @ ${props.currentFps} fps`}
    </footer>
  </div>
)

// Props
Scene.propTypes = {
  classes: PropTypes.object.isRequired,
  sceneRef: PropTypes.func,
  isFetching: PropTypes.bool,
  sinceStart: PropTypes.number,
  currentFps: PropTypes.number,
  handlers: PropTypes.object.isRequired
}

export default withStyles(styles)(Scene)
