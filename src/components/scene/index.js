import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { setSceneSize, setCurrentKey } from 'store/scene/actions'

// Presentational
import Scene from './Scene'

// Context
const SceneContext = React.createContext({ animationInterval: 0 })

// Container
class SceneContainer extends Component {
  constructor (props) {
    super(props)

    this.fpsInterval = 1000 / 4 // fps

    this.state = {
      animation: {
        stopedAnim: false,
        animationInterval: 0
      }
    }
  }

  componentDidMount() {
    // set viewport size
    this.updateWindowDimensions()

    // recalculate viewport size
    window.addEventListener('resize', this.updateWindowDimensions)

    // start animation
    this.startLoop()
  }

  componentWillUnmount() {
    // remove viewport resizing listener
    window.removeEventListener('resize', this.updateWindowDimensions)

    // remove animationFrame loop
    this.stopLoop()
  }

  updateWindowDimensions = () => {
    this.props.setSceneSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  startLoop() {
    // animationFrame settings
    this.then = Date.now()
    this.startTime = this.then

    // create animationFrame
    if( !this._frameId ) this._frameId = window.requestAnimationFrame( this.loop )
  }

  stopLoop() {
    window.cancelAnimationFrame( this._frameId )
  }

  loop = time => {
    if (this.stopedAnim) return

    // calc elapsed time since last loop
    let now = Date.now()
    let elapsed = now - this.then
    let animationInterval = now - this.startTime

    // set up next iteration of the loop
    this.frameId = window.requestAnimationFrame( this.loop )

    // check fps
    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval)

      this.setState({ animation: { animationInterval } })
    }

  }

  onKeyDown = e => {
    // keyCodes: space = 32 / enter = 13 / arrows = 37 38 39 40
    if(e.keyCode !== this.state.currentKey && /(13|32|37|38|39|40)$/.test(e.keyCode)) {
      this.props.setCurrentKey({ currentKey: e.keyCode })
    }
  }

  render () {
    return (
      <SceneContext.Provider value={this.state.animation}>
        <Scene {...this.props} onKeyDown={this.onKeyDown} />
      </SceneContext.Provider>
    )
  }
}

export { SceneContext }

export default connect(
  ({ scene }) => ({ scene }),
  { setSceneSize, setCurrentKey }
)(SceneContainer)
