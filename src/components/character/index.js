import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { setInitialValues, updateCharacter } from 'store/character/actions'

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
    const { round, refX, refY } = this.props.scene

    if(prevProps.scene.round !== round) return

    if(prevProps.scene.refX !== refX || prevProps.scene.refY !== refY) {
      const { body } = this.props.character
      const newBody = this.updateCharacterPosition(body, refX, refY)

      this.props.updateCharacter({ body: newBody })
    }
  }

  initCharacter() {
    const { blockSize, initialCharLenght } = this.props.scene
    const body = this.createBodyParts(blockSize, initialCharLenght)

    this.props.setInitialValues({ body })

    this.setState({
      width: blockSize,
      height: blockSize,
      fontSize: blockSize
    })
  }

  createBodyParts(blockSize, charLenght) {
    let body = []
    for (let i = charLenght-1; i >= 0; --i) {
      body.push({ x: i*blockSize, y: 0, rotation: 0 })
    }
    return body
  }

  updateCharacterPosition(body, refX, refY) {
    // removes last item of array, copy and add it to beginning of new one
    const lastBlock = body.length - 1
    const newBlock = Object.assign({}, body[lastBlock], {x:refX, y:refY})
    const newBody = [ newBlock, ...body.slice(0, lastBlock) ]

    return newBody
  }

  render() {
    return(
      <Character
        style={this.state}
        body={this.props.character.body}
      />
    )
  }
}

export default connect(
  ({ character, scene }) => ({ character, scene }),
  { setInitialValues, updateCharacter }
)(CharacterContainer)
