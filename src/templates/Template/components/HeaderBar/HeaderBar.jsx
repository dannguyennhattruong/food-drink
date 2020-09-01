import React, { PureComponent } from 'react'
import styles from './HeaderBar.module.scss'
import { Context as ThemeContext } from '../../../../store/app/appContext'
import { Switch } from 'antd'
import { Button, Tooltip } from 'antd'
import { AlignLeftOutlined } from '@ant-design/icons'

const themeHeader = [
  {
    background: '#2C2C34',
    color: '#fff'
  },
  {
    background: '#f5f5f5',
    color: '#2C2C34'
  }
]

class HeaderBar extends PureComponent {
  static contextType = ThemeContext

  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      themeCurrent: {},
      isCheckSwitch: false
    }
  }

  onChange = e => {
    const { change__theme__app } = this.context
    change__theme__app()
    this.setState({ isCheckSwitch: !this.state.isCheckSwitch })
  }

  render () {
    const { theme } = this.context.state
    const style = theme === 'light' ? themeHeader[1] : themeHeader[0]
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div className={styles.HeaderBarWrapper} style={{ ...style }}>
        <div className={styles.name}>
          <Tooltip title='Fullscreen'>
            <Button type='primary' shape='circle' icon={<AlignLeftOutlined />} />
          </Tooltip>
          <span style={{marginLeft:'10px',fontWeight:'600'}}>  DASHBOARD</span>
        </div>
        <div className={styles.toolbar}>
          <Switch checked={this.state.isCheckSwitch} onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

HeaderBar.propTypes = {
  // bla: PropTypes.string,
}

HeaderBar.defaultProps = {
  // bla: 'test',
}

export default HeaderBar
