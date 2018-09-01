import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'

export default (ModalContent) => (
  class extends Component {
    constructor(props) {
      super(props)
      this.state = { open: true }
    }

    isModalOpen = val => {
      this.setState({ open: val })
    }

    render(){
      return (
        <Dialog
          open={this.state.open}
          // onClose={() => this.isModalOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <ModalContent
            {...this.props}
            // modal={{ needToOpen: this.isModalOpen }}
          />
        </Dialog>
      )
    }
  }
)
