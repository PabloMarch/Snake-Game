import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import * as actions from 'store/scene/actions'

// Presentational
import Scene from './Scene'

// Container
class SceneContainer extends Component {
  constructor (props) {
    super(props)

    this.frameCount = 1

    this.state = {
      isFetching: true,
      animationInterval: 1,
      innerWidth: 0,
      innerHeigth: 0
    }
  }

  componentDidMount() {
    // fetch initial settings
    this.props.fetchGameSettings()
      .then(() => {
        const { initialCharLenght, blockSize } = this.props.scene

        // set viewport size
        this.onViewportSizeUpdate()

        // set initial position for next movement
        this.props.updateRefPosition({ refX: blockSize*(initialCharLenght-1) })

        // start keyFrame loop
        this.startLoop()

        // hide loader
        this.setState({ isFetching: false })
        this.sceneRef.focus()
      })

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
    this.fpsInterval = 1000 / this.props.scene.fps

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
      this.onUpdateDirection()
    }
  }

  onStartGame = () => {
    this.props.pauseGame({ isGamePaused: false })
    // this.sceneRef.focus()
    console.log(this.sceneRef)
  }

  onResetGame = () => {
    this.props.pauseGame({ isGamePaused: true })
    this.props.resetGame({ round: this.props.scene.round+1 })
  }

  onIncrementScore = () => {
    this.props.incrementScore({ score: this.props.scene.score+1 })
  }

  onUpdateDirection() {
    const { currentKey, blockSize, refX, refY } = this.props.scene

    // Change direction
    switch(currentKey) {
      case 'ArrowLeft':
        this.props.updateRefPosition({ refX: refX-blockSize })
        break

      case 'ArrowRight':
        this.props.updateRefPosition({ refX: refX+blockSize })
        break

      case 'ArrowUp':
        this.props.updateRefPosition({ refY: refY-blockSize })
        break

      case 'ArrowDown':
        this.props.updateRefPosition({ refY: refY+blockSize })
        break
    }
  }

  onViewportSizeUpdate = () => {
    const { blockSize } = this.props.scene
    const { offsetWidth, offsetHeight } = this.sceneRef
    const innerWidth = offsetWidth - offsetWidth%blockSize || blockSize
    const innerHeigth = offsetHeight - offsetHeight%blockSize || blockSize

    // set scene container
    this.setState({
      innerWidth: innerWidth,
      innerHeigth: innerHeigth
    })

    // fix scene size to never overlays screen dimensions
    this.props.setSceneSize({
      sceneWidth: innerWidth - blockSize,
      sceneHeight: innerHeigth - blockSize
    })
  }

  onKeyDown = keyCode => {
    const { currentKey, isGamePaused } = this.props.scene
    let pressedKey = currentKey

    // only allows those keys on game
    if(/(13|32|37|38|39|40)$/.test(keyCode)) {
      switch (keyCode) {
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

      if(pressedKey && pressedKey !== currentKey) {
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
        width={this.state.innerWidth}
        height={this.state.innerHeigth}
        handlers={{
          isPaused: this.props.scene.isGamePaused,
          keyDown: this.onKeyDown,
          startGame: this.onStartGame,
          resetGame: this.onResetGame,
          incrementScore: this.onIncrementScore
        }}
      />
    )
  }
}

export default connect(
  ({ scene }) => ({ scene }),
  { ...actions }
)(SceneContainer)
