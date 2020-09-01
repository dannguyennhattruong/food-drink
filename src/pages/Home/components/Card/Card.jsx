import React, { PureComponent } from 'react'
import styles from './Card.module.scss'

class Card extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  render () {
    const { title, number, color } = this.props
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div className={styles.CardWrapper} style={{ background : color }}>
        <h1>{title}</h1>
        <p>{number}</p>
      </div>
    )
  }
}

Card.propTypes = {
  // bla: PropTypes.string,
}

Card.defaultProps = {
  // bla: 'test',
}

export default Card
