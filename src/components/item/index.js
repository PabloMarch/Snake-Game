import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import * as actions from 'store/items/actions'

// Presentational
import Item from './Item'

// Container
class ItemContainer extends PureComponent {
  static propTypes = {
    incrementScore: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      fontSize: 1,
      height: 0,
      width: 0
    }
  }

  componentDidMount() {
    this.createItem()
  }

  componentDidUpdate(prevProps) {
    const { scene } = this.props

    // test if item is caught
    const isItemCollided = scene.refX === this.props.item.x && scene.refY === this.props.item.y
    // check for updates on item position
    const hasChangedPosition = prevProps.scene.refX !== scene.refX || prevProps.scene.refY !== scene.refY
    // check for change on viewport
    const isScreenSizeUpdated = prevProps.scene.sceneWidth !== scene.sceneWidth || prevProps.scene.sceneHeight !== scene.sceneHeight

    if(isItemCollided && hasChangedPosition) {
      this.props.incrementScore()
      this.createItem()
    }
    else if(isScreenSizeUpdated) {
      this.createItem()
    }
  }

  createItem() {
    const { blockSize, sceneWidth, sceneHeight } = this.props.scene

    this.props.setRandomItem({
      x: this.setItemPosition( this.generateRandomNum(1, sceneWidth), blockSize),
      y: this.setItemPosition( this.generateRandomNum(1, sceneHeight), blockSize),
    })

    this.setState({
      fontSize: blockSize,
      height: blockSize,
      width: blockSize
    })
  }

  setItemPosition(position, blockSize) {
    return position - position % blockSize
  }

  generateRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  render() {
    return (
      <Item
        style={this.state}
        position={this.props.item}
      />
    )
  }
}

export default connect(
  ({ item, scene }) => ({ item, scene }),
  { ...actions }
)(ItemContainer)
