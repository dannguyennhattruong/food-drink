import React, { PureComponent } from 'react'
import { Modal, Button, Input, Form, Select, message } from 'antd'
import { AppleOutlined } from '@ant-design/icons'
import { list__categories } from '../../../../services/category.service'
import { create__food } from '../../../../services/food.service'

class EditFood extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      loading: false,
      visible: true,
      name: '',
      category: '',
      listCategory: []
    }
  }

  componentDidMount () {
    list__categories()
      .then(res => this.setState({ listCategory: res.map(r => r.name) }))
      .catch(e => this.setState({ hasError: true }))
  }

  onChangeName = e => {
    // console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeCategory = e => {
    // console.log(e)
    this.setState({ category: e })
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
    create__food({ name: this.state.name, category: this.state.category }).then(
      res => {
        console.log(res)
        if (Object.keys(res).includes('category')) {
          message.success(
            `Bạn đã thêm thành công ${
              res.category === 'DRINK' ? 'thức uống' : 'thức ăn'
            } với tên là ${res.name}`
          )
          this.props.command('refresh')
        } else {
          message.error(`Có lỗi đã xảy ra !!`)
        }
        this.setState({ loading: false, visible: false })
        this.props.action('close')
      }
    )
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
          <Form name='time_related_controls'>
            <Form.Item
              name='name'
              hasFeedback
              validateStatus={this.state.name !== '' ? 'success' : 'warning'}
              rules={[
                {
                  required: true,
                  message: 'Please input your food name!'
                }
              ]}
            >
              <label>Food name</label>
              <br />
              <Input
                name='name'
                prefix={<AppleOutlined className='site-form-item-icon' />}
                placeholder='Food name'
                onChange={this.onChangeName}
              />
            </Form.Item>
            <Form.Item
              // name='category'
              hasFeedback
              validateStatus={
                this.state.category !== '' ? 'success' : 'warning'
              }
              // getValueFromEvent={this.onChangeName}
              rules={[
                {
                  required: true,
                  message: 'Please input your food name!'
                }
              ]}
            >
              <label>Choose category</label>
              <br />
              <Select
                style={{ width: '50%' }}
                onChange={this.onChangeCategory}
                loading={
                  this.state.loading && this.state.listCategory.length === 0
                }
              >
                {this.state.listCategory.map((e, i) => {
                  return (
                    <Select.Option key={e} value={e}>
                      {e}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Form>
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
