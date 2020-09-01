import React, { PureComponent } from 'react'
import styels from './SideBar.module.scss'
import { Context as ThemeContext } from '../../../../store/app/appContext'

const NavigationBar = ({ title, onClick, active }) => {
  const styles = active
    ? {
        borderBottom: `0.3px solid tomato`,
        color: `tomato`
      }
    : null
  return (
    <div
      className={styels.NavigationBar}
      onClick={onClick}
      style={{ ...styles }}
    >
      <p style={{ margin: 0 }}>{title}</p>
    </div>
  )
}

const menu = [
  {
    id: '/home',
    title: 'HOME'
  },
  {
    id: '/food&drink',
    title: 'FOOD & DRINK'
  },
  {
    id: '/category',
    title: 'CATEGORY'
  }
]

const themeSideBar = [
  {
    background: '#3C4B64',
    color: '#D0D4DA'
  },
  {
    background: '#2C2C34',
    color: '#ffffff'
  }
]

class SideBar extends PureComponent {
  static contextType = ThemeContext

  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      pathname: ''
    }
  }

  componentDidMount () {
    console.log(this.props)
    if (this.props.location.pathname) {
      this.setState({
        pathname: this.props.location.pathname
      })
    }
  }

  render () {
    const { theme } = this.context.state
    const currentTheme = theme === 'light' ? themeSideBar[0] : themeSideBar[1]
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div className={styels.SideBarWrapper} style={{ ...currentTheme }}>
        <div className={styels.logo}>
          <img
            alt=''
            src={require('../../../../assets/icons/food.png')}
            style={{ width: '50xp', height: '50px' }}
          />
          <p>FOOD Management</p>
        </div>
        <div style={{ margin: '50px' }} />
        {menu.map((e, i) => {
          return (
            <NavigationBar
              key={i}
              title={e.title}
              active={e.id === this.state.pathname}
              onClick={() => this.props.history.push(e.id)}
            />
          )
        })}
      </div>
    )
  }
}

SideBar.propTypes = {
  // bla: PropTypes.string,
}

SideBar.defaultProps = {
  // bla: 'test',
}

export default SideBar
