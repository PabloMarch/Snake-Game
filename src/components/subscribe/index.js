import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

// lib
import { withModal } from 'lib'

// presentational
import Subscribe from './Subscribe'

class SubscribeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { isSubscribing: false }
  }

  onSubscribe = () => {
    this.setState({ isSubscribing: true })
  }

  render(){
    return (
      <Subscribe
        isSubscribing={this.state.isSubscribing}
        onClose={this.props.startGame}
        onSubscribe={this.onSubscribe}
      />
    )
  }
}

export default withModal(SubscribeContainer)

// export default compose(
//   withModal,
//   connect(({ scene }) => ({ scene }))
// )(SubscribeContainer)
