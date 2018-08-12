import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { updateCharacter } from 'store/character/actions'

// Presentational
import Character from './Character'

class CharacterContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      fontSize: 1
    }
  }

  componentDidMount() {
    this.initCharacter()
  }

  componentDidUpdate(prevProps) {
    const { refX, refY } = this.props.scene

    if(prevProps.scene.refX !== refX || prevProps.scene.refY !== refY) {
      this.updateCharacterPosition(refX, refY)
    }
  }

  initCharacter() {
    const { blockSize, initialCharLenght } = this.props.scene
    const body = this.createBodyParts(blockSize, initialCharLenght)

    this.props.updateCharacter({ body })

    this.setState({
      width: blockSize,
      height: blockSize,
      fontSize: blockSize
    })
  }

  createBodyParts(size, nodes) {
    let body = []
    for(let i = 0; i < nodes; i++) {
      body[i] = { x: i*size, y: 0, rotation: 0 }
    }
    return body
  }

  updateCharacterPosition(refX, refY) {
    const { body } = this.props.character

    // removes first item of array, copy and add it to end with new values
    const item = Object.assign({}, body[0], {x:refX, y:refY})
  	const newBody = [ ...body.slice(1, body.length), item ]

    this.props.updateCharacter({ body: newBody })
  }

  render() {
    return(
      <Character
        style={this.state}
        body={this.props.character.body}
        onCharacterUpdate={this.onCharacterUpdate}
      />
    )
  }
}

export default connect(
  ({ character, scene }) => ({ character, scene }),
  { updateCharacter }
)(CharacterContainer)
