import React, { PureComponent } from 'react'

import styles from './Template.module.scss'
import HeaderBar from './components/HeaderBar/HeaderBar'
import SideBar from './components/SideBar/SideBar'
import { Context as AppContext } from '../../store/app/appContext'
import { list__users, SECRET_KEY } from '../../services/user.service'
import { isLogined } from '../../utils'
var jwt = require('jsonwebtoken')

class Template extends PureComponent {
  static contextType = AppContext
  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      currentUser: {}
    }
  }

  componentDidMount () {
    // console.log(this.props)
    if (isLogined()) {
      const decode = jwt.verify(localStorage.getItem('jwt'),SECRET_KEY)
      // console.log(decode)
      list__users().then(res => {
        const user = res.data.filter(d => d.id === decode.id);
        // console.log(user)
        this.setState({ currentUser: user[0] })
      })
    }
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div
        className={styles.TemplateWrapper}
        style={{ ...this.props.themeNow }}
      >
        {!this.context.state.isHideSideBar && <SideBar {...this.props} />}
        <div className={styles.rightSide}>
          <HeaderBar {...this.props} user={this.state.currentUser} />
          <div className={styles.content}>{this.props.children}</div>
        </div>
      </div>
    )
  }
}

Template.propTypes = {
  // bla: PropTypes.string,
}

Template.defaultProps = {
  // bla: 'test',
}

export default Template
