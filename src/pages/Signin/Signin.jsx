import React, { PureComponent } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Signin extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div className='SigninWrapper' 
           style={{width:"100%", height : "100%",display:"flex", justifyContent:"center",alignItems:"center", padding:"70px"}}>
        <Form
          {...layout}
          // style
          name='basic'
          autoComplete={false}
          initialValues={{
            remember: true
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input autoComplete={false} />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

Signin.propTypes = {
  // bla: PropTypes.string,
}

Signin.defaultProps = {
  // bla: 'test',
}

export default Signin
