import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
// import * as actions from 'store/controls/actions'

// Presentational
import Controls from './Controls'

// Container
class ControlsContainer extends PureComponent {
  static propTypes = {
    keyDown: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value })
    this.props.keyDown(Number(e.target.value))
  }

  render() {
    return (
      <Controls
        value={this.state.value}
        onChange={this.onChange}
      />
    )
  }
}

export default ControlsContainer

// export default connect(
//   ({ contorls }) => ({ controls }),
//   { ...actions }
// )(ControlsContainer)
