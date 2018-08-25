import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import * as actions from 'store/character/actions'

// Presentational
import Character from './Character'

// Container
class CharacterContainer extends PureComponent {
  static propTypes = {
    resetGame: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      fontSize: 1,
      height: 0,
      needNewBodyBlock: false,
      width: 0
    }
  }

  componentDidMount() {
    this.initCharacter()
  }

  // some conditions here must be move to
  // shouldComponentUpdate and update only if position is change
  // this way needNewBodyBlock is not needed anymore
  componentDidUpdate(prevProps, prevState) {
    const { body } = this.props.character
    const { score, round, refX, refY, sceneWidth, sceneHeight } = this.props.scene

    // turn on new item flag
    if(prevProps.scene.score < score) {
      this.setState({ needNewBodyBlock: true })
    }

    if(
      // returns if position does not change
      prevProps.scene.refX === refX && prevProps.scene.refY === refY ||
      // return if is a new game
      prevProps.scene.round !== round
    ) {
      return
    }

    if(
      // reset when die
      this.collideOnOwnBody(body, refX, refY) ||
      this.touchSceneLimit(refX, sceneWidth) ||
      this.touchSceneLimit(refY, sceneHeight)
    ) {
        this.props.resetGame()
        return
    }

    // updates characther position
    this.props.updateCharacterBlocks({
      body: this.updateCharacterPosition(body, refX, refY, this.state.needNewBodyBlock)
    })

    // turn off new item flag
    if(this.state.needNewBodyBlock) {
      this.setState({ needNewBodyBlock: false })
    }
  }

  initCharacter() {
    const { blockSize, initialCharLenght } = this.props.scene
    const body = this.createBodyParts(blockSize, initialCharLenght)

    this.props.setCharacterBlocks({ body })

    this.setState({
      width: blockSize,
      height: blockSize,
      fontSize: blockSize
    })
  }

  createBodyParts(blockSize, charLenght) {
    let body = []
    for(let i = 0; i < charLenght; i++) {
      body[i] = { x: i*blockSize, y: 0, rotation: 0 }
    }
    return body
  }

  updateCharacterPosition(body, refX, refY, isNewItem) {
    const head = Object.assign({}, body[0], { x:refX, y:refY })
  	const updatedBody = isNewItem ? body : body.slice(1, body.length)

    return [ ...updatedBody, head ]
  }

  collideOnOwnBody(body, refX, refY) {
    for(var i = 0; i < body.length; i++) {
      if(body[i].x === refX && body[i].y === refY) return true
    }
    return false
  }

  touchSceneLimit(position, limit) {
    return position < 0 || position > limit
  }

  render() {
    return (
      <Character
        style={this.state}
        body={this.props.character.body}
      />
    )
  }
}

export default connect(
  ({ character, scene }) => ({ character, scene }),
  { ...actions }
)(CharacterContainer)
