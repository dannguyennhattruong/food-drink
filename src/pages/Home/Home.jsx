import React, { PureComponent } from 'react'
import styles from './Home.module.scss'
import Card from './components/Card/Card'
import { Card as CardANTD, Avatar } from 'antd'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { theme } from '../../contanst'

const { Meta } = CardANTD

class Home extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  componentDidMount () {
    console.log(this.props)
  }

  cards = [
    {
      name: 'FOOD',
      percent: '42,6%',
      color: 'tomato'
    },
    {
      name: 'DRINK',
      percent: '59,6%',
      color: '#1c2e4a'
    },
    {
      name: 'USER',
      percent: '23.5%',
      color: '#778899'
    }
  ]

  category = [
    {
      name: 'FASTFOOD',
      src: require('../../assets/images/fastfood.jpg')
    },
    {
      name: 'DRINK',
      src: require('../../assets/images/drink.jpg')
    },
    {
      name: 'TRANDITIONAL FOOD',
      src: require('../../assets/images/tfood.jpg')
    }
  ]

  foods = [
    {
      name: 'foodA',
      src: require('../../assets/images/fooda.jpg')
    },
    {
      name: 'foodB',
      src: require('../../assets/images/foodb.jpg')
    },
    {
      name: 'foodC',
      src: require('../../assets/images/foodc.jpg')
    }
  ]

  render () {
    const themeProps = this.props.theme
    const currentTheme = themeProps === 'light' ? theme[1] : theme[0]
    console.log(currentTheme.color)
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div className={styles.HomeWrapper} style={{ ...currentTheme }}>
        <div className={styles.CardArea}>
          {this.cards.map((e, i) => {
            return (
              <Card key={i} number={e.percent} title={e.name} color={e.color} />
            )
          })}
        </div>
        <div className={styles.heading}>
          <h1 style={{ color: currentTheme.color }}>New Categories </h1>
        </div>
        <div className={styles.NewCategoryArea}>
          {this.category.map((e, i) => {
            return (
              <CardANTD
                key={i}
                hoverable
                style={{ flex: 1, margin: '20px' }}
                cover={
                  <img alt='example' src={e.src} style={{ height: '200px' }} />
                }
              >
                <Meta title={e.name} description='www.instagram.com' />
              </CardANTD>
            )
          })}
        </div>
        <div className={styles.heading}>
          <h1 style={{ color: currentTheme.color }}>New Foods </h1>
        </div>
        <div className={styles.NewCategoryArea}>
          {this.foods.map((e, i) => {
            return (
              <CardANTD
                key={i}
                style={{ flex: 1, margin: '20px' }}
                cover={
                  <img alt='example' src={e.src} style={{ height: '200px' }} />
                }
                actions={[
                  <SettingOutlined key='setting' />,
                  <EditOutlined key='edit' />,
                  <EllipsisOutlined key='ellipsis' />
                ]}
              >
                <Meta
                  avatar={<Avatar src={e.src} />}
                  title={e.name}
                  description='This is the description'
                />
              </CardANTD>
            )
          })}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  // bla: PropTypes.string,
}

Home.defaultProps = {
  // bla: 'test',
}

export default Home
