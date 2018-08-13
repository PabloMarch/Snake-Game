import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import {
  fetchGameSettings,
  setSceneSize,
  setCurrentKey,
  setGameSettings,
  resetGame,
  pauseGame,
  moveOnDirection
} from 'store/scene/actions'

// Presentational
import Scene from './Scene'

// Container
class SceneContainer extends Component {
  constructor (props) {
    super(props)

    this.frameCount = 1

    this.state = {
      isFetching: true,
      animationInterval: 1
    }
  }

  componentDidMount() {
    // fetch initial settings
    this.props.fetchGameSettings()
      .then(() => {
        const { initialCharLenght, blockSize } = this.props.scene

        // set initial position for next movement
        this.props.moveOnDirection({ refX: blockSize*(initialCharLenght-1) })

        // start animation
        this.startLoop()

        // hide loader & focus scene
        this.setState({ isFetching: false })
        this.sceneRef.focus()
      })

    // set viewport size
    this.onViewportSizeUpdate()

    // recalculate viewport size
    window.addEventListener('resize', this.onViewportSizeUpdate)
  }

  componentWillUnmount() {
    // remove viewport resizing listener
    window.removeEventListener('resize', this.onViewportSizeUpdate)

    // remove animationFrame loop
    this.stopLoop()
  }

  startLoop() {
    // animationFrame settings
    this.lastRender = Date.now()
    this.startTime = this.lastRender
    this.fpsInterval = 1000 / this.props.scene.fps // fps

    // create animationFrame
    if( !this.frameId ) {
      this.frameId = window.requestAnimationFrame( this.loop )
    }
  }

  stopLoop() {
    window.cancelAnimationFrame( this.frameId )
  }

  loop = () => {
    // set up next iteration of the loop
    this.frameId = window.requestAnimationFrame( this.loop )

    // pause rendering
    if(this.props.scene.isGamePaused) return

    // calc elapsed time since last loop
    let currTime = Date.now()
    let elapsed = currTime - this.lastRender
    let animationInterval = currTime - this.startTime

    // check fps
    if (elapsed > this.fpsInterval) {
      this.lastRender = currTime - (elapsed % this.fpsInterval)
      this.setState({ animationInterval })
      this.onTouchLimits()
      this.onUpdateDirection()
    }
  }

  onUpdateDirection() {
    const { currentKey, blockSize, refX, refY } = this.props.scene

    // Change direction
    switch(currentKey) {
      case 'ArrowLeft':
        this.props.moveOnDirection({ refX: refX-blockSize })
        break

      case 'ArrowRight':
        this.props.moveOnDirection({ refX: refX+blockSize })
        break

      case 'ArrowUp':
        this.props.moveOnDirection({ refY: refY-blockSize })
        break

      case 'ArrowDown':
        this.props.moveOnDirection({ refY: refY+blockSize })
        break
    }
  }

  onTouchLimits() {
    const { refX, refY, blockSize, sceneWidth, sceneHeight, round } = this.props.scene
    const fixedWidth = sceneWidth-blockSize
    const fixedHeight = sceneHeight-blockSize

    if(refX < 0 || refX > fixedWidth || refY < 0 || refY > fixedHeight) {
      this.props.resetGame({ round: round+1 })
      alert('YOU LOSE!!')
    }
  }

  onViewportSizeUpdate = () => {
    this.props.setSceneSize({
      sceneWidth: this.sceneRef.offsetWidth,
      sceneHeight: this.sceneRef.offsetHeight
    })
  }

  onKeyDown = e => {
    const { currentKey, isGamePaused } = this.props.scene
    let pressedKey = currentKey

    // only allows those keys on game
    if(/(13|32|37|38|39|40)$/.test(e.keyCode)) {
      switch (e.keyCode) {
        case 13: // enter
          console.log('Show Menu...')
          break

        case 32: // space
          this.props.pauseGame({ isGamePaused: !isGamePaused })
          break

        case 37: // left
          if (currentKey != 'ArrowRight') pressedKey = 'ArrowLeft'
          break

        case 38: // up
          if (currentKey != 'ArrowDown') pressedKey = 'ArrowUp'
          break

        case 39: // right
          if (currentKey != 'ArrowLeft') pressedKey = 'ArrowRight'
          break

        case 40: // down
          if (currentKey != 'ArrowUp') pressedKey = 'ArrowDown'
          break
      }

      if(pressedKey && currentKey !== e.key) {
        this.props.setCurrentKey({ currentKey: pressedKey })
      }
    }
  }

  render() {
    // Detail of FPS values
    let { animationInterval } = this.state
    let sinceStart = animationInterval / 1000 | 0
    let currentFps = parseFloat((1000 / (animationInterval / ++this.frameCount)).toFixed(2))

    return (
      <Scene
        {...this.props}
        sceneRef={el => this.sceneRef = el}
        isFetching={this.state.isFetching}
        sinceStart={sinceStart}
        currentFps={currentFps}
        onKeyDown={this.onKeyDown}
      />
    )
  }
}

export default connect(
  ({ scene }) => ({ scene }),
  {
    fetchGameSettings,
    setSceneSize,
    setCurrentKey,
    setGameSettings,
    resetGame,
    pauseGame,
    moveOnDirection
  }
)(SceneContainer)
