import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// Actions
import * as actions from 'store/character/actions'

// Presentational
import Character from './Character'

// Container
class CharacterContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      fontSize: 1,
      isCharIncreated: false
    }
  }

  componentDidMount() {
    this.initCharacter()
  }

  componentDidUpdate(prevProps, prevState) {
    const { score, round, refX, refY } = this.props.scene

    // returns when died
    if(prevProps.scene.round !== round) return

    // keep internal tracking of new items
    if(prevProps.scene.score !== score) {
      this.setState({ isCharIncreated: true })
    }

    // only updates when reference position changes
    if(prevProps.scene.refX !== refX || prevProps.scene.refY !== refY) {
      const { body } = this.props.character
      const isBodyCollided = this.checkCollisionOnBody(body, refX, refY)

      // check if body touch itself
      if(isBodyCollided) {
        // starts game again
        this.props.resetGame()
      } else {
        // update body
        const updatedBody = this.updateCharacterPosition(body, refX, refY, this.state.isCharIncreated)
        this.props.updateCharacterBlocks({ body: updatedBody })
        this.setState({ isCharIncreated: false })
      }
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
    const item = Object.assign({}, body[0], { x:refX, y:refY })
  	const updatedBody = isNewItem ? body : body.slice(1, body.length)

    return [ ...updatedBody, item ]
  }

  checkCollisionOnBody(body, refX, refY) {
    for(var i = 0; i < body.length; i++) {
      if(body[i].x === refX && body[i].y === refY) return true
    }
    return false
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
