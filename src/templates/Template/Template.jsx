import React, { PureComponent } from 'react'

import styles from './Template.module.scss'
import HeaderBar from './components/HeaderBar/HeaderBar'
import SideBar from './components/SideBar/SideBar'

class Template extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  componentDidMount () {
    console.log(this.props)
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
        <SideBar {...this.props} />
        <div className={styles.rightSide}>
          <HeaderBar {...this.props} />
          <div className={styles.content}>
            {this.props.children}
          </div>
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
