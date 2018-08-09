import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

// Components
import styles from './styles'

// Presentational
const ScoreBoard = (props) => (
  <AppBar position='static' className={props.classes.root}>
    <Toolbar>
      <IconButton className={props.classes.menuButton} color="inherit" aria-label="Menu">
        <Icon>menu</Icon>
      </IconButton>
      <Typography variant="title" color="inherit" className={props.classes.flex}>
        Snake React Game
      </Typography>
      <Button href="https://github.com/pablomarch/snake-game" color="inherit">GitHub</Button>
      <Button color="inherit">Start</Button>
    </Toolbar>
  </AppBar>
)

// Props
ScoreBoard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScoreBoard)
