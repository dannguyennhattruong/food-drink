import React, { PureComponent } from 'react'
import { Button, Modal, Typography, message } from 'antd'
import { sign_up, sign_in } from '../../services/user.service'
const { Text } = Typography

class Signin extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      email: '',
      isLoading: false,
      password: '',
      status: '',
      isSignIn: false,
      visible: false
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  onChangeEmail = e => this.setState({ [e.target.name]: e.target.value })
  onSignUp = () => {
    this.setState({ isLoading: true })
    sign_up(this.state.email).then(res => {
      
      if (res.data.message === 'Thành công') {
        this.setState({ visible: true })
        message.success(res.data.message)
      }
      else {
        message.error(res.data.message)
      }
      this.setState({ isLoading: false })
    })
  }

  switch_to_signin_or_signup = () =>
    this.setState({ isSignIn: !this.state.isSignIn })

  render_signup = () => {
    return (
      <div>
        <Modal
          title='Thông báo'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{`Xin hãy kiểm tra thư điện tử của bạn ${this.state.email}, sau đó quay lại và dùng email và mật khẩu để đăng nhập`}</p>
          <p>
            Trong trường hợp không đăng nhập được xin hãy liên hệ địa chỉ email
            : nhattruong2513@gmail.com
          </p>
          <span role='img' aria-label=''>
            🔥🔥🔥
          </span>
        </Modal>
        <h3>Sign me up </h3>
        <label htmlFor='email' style={{ margin: '5px' }}>
          Email
        </label>
        <input
          type='text'
          name='email'
          onChange={this.onChangeEmail}
          style={{ marginRight: '5px' }}
        />
        <Button
          loading={this.state.isLoading}
          onClick={this.onSignUp}
          style={{ marginRight: '5px' }}
        >
          Sign up
        </Button>
        <Button
          loading={this.state.isLoading}
          onClick={this.switch_to_signin_or_signup}
        >
          Go sign in{' '}
          <span role='img' aria-label=''>
            😊😊
          </span>
        </Button>
      </div>
    )
  }

  onChangePassword = e => this.setState({ [e.target.name]: e.target.value })
  onSignin = () => {
    this.setState({ isLoading: true })
    sign_in(this.state.email, this.state.password).then(res => {
      this.setState({ status: res.data.status })
      if (res.data.status === 'OK') {
        localStorage.setItem('jwt', Date.now())
        window.location.reload()
      } else {
        message.warn(res.data.message)
      }
      this.setState({ isLoading: false })
    })
  }

  render_signin = () => {
    return (
      <div>
        <h3>
          Sign me in{' '}
          <span role='img' aria-label=''>
            🔥🔥🔥
          </span>
        </h3>
        <label htmlFor='email' style={{ margin: '5px' }}>
          Email
        </label>
        <input
          type='text'
          name='email'
          onChange={this.onChangeEmail}
          value={this.state.email}
          style={{ marginRight: '5px' }}
        />
        <label htmlFor='password' style={{ margin: '5px' }}>
          Password
        </label>
        <input
          type='password'
          name='password'
          onChange={this.onChangeEmail}
          value={this.state.password}
          style={{ marginRight: '5px' }}
        />
        <Button
          loading={this.state.isLoading}
          onClick={this.onSignin}
          style={{ marginRight: '5px' }}
        >
          Sign in
        </Button>
        <Button
          loading={this.state.isLoading}
          onClick={this.switch_to_signin_or_signup}
        >
          Go sign up{' '}
          <span role='img' aria-label=''>
            😊😊
          </span>
        </Button>
      </div>
    )
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div
        className='SigninWrapper'
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '70px'
        }}
      >
        <Text
          keyboard
          strong
          style={{ fontSize: '50px', margin: '50px', color: 'blue' }}
        >
          DATA CENTER - FOOD ADMIN
        </Text>
        <br />
        {!this.state.isSignIn ? this.render_signup() : this.render_signin()}
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
