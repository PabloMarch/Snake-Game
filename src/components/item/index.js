import React, { Component } from 'react'
import { connect } from 'react-redux'

// Presentational
import Item from './Item'

class ItemContainer extends Component {
  render () {
    return <Item {...this.props} />
  }
}

export default connect(
  ({ item }) => ({ item })
)(ItemContainer)
