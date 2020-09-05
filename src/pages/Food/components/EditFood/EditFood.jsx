import React, { PureComponent } from 'react'
import { Modal, Button } from 'antd'

class EditFood extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      loading: false,
      visible: true
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({ visible: false })
    this.props.action('close')
  }

  handleOk = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
      this.props.action('close')
    }, 3000)
  }

  render () {
    const { loading, visible } = this.state
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div className='EditFoodWrapper'>
        <Modal
          visible={visible}
          title='Title'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}

EditFood.propTypes = {
  // bla: PropTypes.string,
}

EditFood.defaultProps = {
  // bla: 'test',
}

export default EditFood
