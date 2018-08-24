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
    this.setNewItem()
  }

  componentDidUpdate(prevProps) {
    const { refX, refY, blockSize, sceneWidth, sceneHeight } = this.props.scene
    const { x, y } = this.props.item

    // get reference of middle square position
    const refCenterX = refX+blockSize/2
    const refCenterY = refY+blockSize/2

    // test if screen size change
    const isScreenSizeUpdated = prevProps.scene.sceneWidth !== sceneWidth || prevProps.scene.sceneHeight !== sceneHeight

    // test if item is caught
    const isXPositionCollided = refCenterX >= x && refCenterX <= x+blockSize
    const isYPositionCollided = refCenterY >= y && refCenterY <= y+blockSize
    const hasChangedPosition = prevProps.scene.refX !== refX || prevProps.scene.refY !== refY

    if(hasChangedPosition && isXPositionCollided && isYPositionCollided) {
      this.props.incrementScore()
      this.setNewItem()
    }
    else if(isScreenSizeUpdated) {
      this.setNewItem()
    }
  }

  setNewItem() {
    const { blockSize, sceneWidth, sceneHeight } = this.props.scene

    this.props.setRandomItem({
      x: this.generateRandomNum(blockSize, sceneWidth),
      y: this.generateRandomNum(blockSize, sceneHeight),
    })

    this.setState({
      fontSize: blockSize,
      height: blockSize,
      width: blockSize
    })
  }

  generateRandomNum(min, max) {
    return Math.floor((Math.random() * max-min*3+1) + min*3)
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