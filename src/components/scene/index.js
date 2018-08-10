import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { fetchGameSettings, setSceneSize, setCurrentKey, pauseGame } from 'store/scene/actions'

// Presentational
import Scene from './Scene'

// Context
const SceneContext = React.createContext()

// Container
class SceneContainer extends Component {
  constructor (props) {
    super(props)

    this.frameCount = 0

    this.state = {
      isFetching: true,
      config: {
        animationInterval: 0
      }
    }
  }

  componentDidMount() {
    // fetch initial settings
    this.props.fetchGameSettings()
      .then(() => {
        this.setState({ isFetching: false })

        // start animation
        this.startLoop()
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
    this.pastTime = Date.now()
    this.startTime = this.pastTime
    this.fpsInterval = 1000 / this.props.scene.fps // fps

    // create animationFrame
    if( !this.frameId ) {
      this.frameId = window.requestAnimationFrame( this.loop )
    }
  }

  stopLoop() {
    window.cancelAnimationFrame( this.frameId )
  }

  loop = time => {
    // set up next iteration of the loop
    this.frameId = window.requestAnimationFrame( this.loop )

    // pause rendering
    if(this.props.scene.isGamePaused) return

    // calc elapsed time since last loop
    let currTime = Date.now()
    let elapsed = currTime - this.pastTime
    let animationInterval = currTime - this.startTime

    // check fps
    if (elapsed > this.fpsInterval) {
      this.pastTime = currTime - (elapsed % this.fpsInterval)
      this.setState({ config: { animationInterval } })
    }
  }

  onViewportSizeUpdate = () => {
    this.props.setSceneSize({
      sceneWidth: window.innerWidth,
      sceneHeight: window.innerHeight
    })
  }

  onKeyDown = e => {
    const { currentKey, isGamePaused } = this.props.scene
    // keyCodes: space = 32 / enter = 13 / arrows = 37 38 39 40
    if(/(13|32|37|38|39|40)$/.test(e.keyCode)) {
      switch (e.keyCode) {
        case 32:
          this.props.pauseGame({ isGamePaused: !isGamePaused })
          break;
      }

      if(e.keyCode !== currentKey) {
        this.props.setCurrentKey({ currentKey: e.keyCode })
      }
    }
  }

  render () {
    // Detail of FPS values
    let { animationInterval } = this.state.config
    let sinceStart = (animationInterval / 1000 * 100) / 100 | 0
    let currentFps = (Math.round(1000 / (animationInterval / ++this.frameCount) * 100) / 100).toFixed(2)

    return (
      <SceneContext.Provider value={this.state.config}>
        <Scene
          {...this.props}
          isFetching={this.state.isFetching}
          sinceStart={sinceStart}
          currentFps={currentFps}
          onKeyDown={this.onKeyDown}
        />
      </SceneContext.Provider>
    )
  }
}

export { SceneContext }

export default connect(
  ({ scene }) => ({ scene }),
  { fetchGameSettings, setSceneSize, setCurrentKey, pauseGame }
)(SceneContainer)
