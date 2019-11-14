import React from 'react'
import { Modal } from 'antd'

export const ModalContext = React.createContext(null)

export class CustomModal extends React.Component {
  state = {
    modalVisible: false,
    modalData: null
  }

  show = modalData => {
    this.setState({
      modalVisible: true,
      modalData
    })
  }

  hide = () => {
    this.setState({
      modalVisible: false,
      modalData: null
    })
  }

  render () {
    const { modalVisible, modalData } = this.state
    const { title, children, ...otherProps } = this.props
    return <Modal
      title={title}
      visible={modalVisible}
      footer={null}
      onCancel={this.hide}
      maskClosable={false}
      {...otherProps}
    >
      <ModalContext.Provider value={modalData}>
        {modalVisible ? children : null}
      </ModalContext.Provider>
    </Modal>
  }
}
