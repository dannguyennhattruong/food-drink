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
import { list__foods } from '../../services/food.service'
import { list__users } from '../../services/user.service'

const { Meta } = CardANTD

class Home extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      countFood: 0,
      countDrink: 0,
      countUser: 0
    }
  }

  componentDidMount () {
    list__foods().then(res => {
      const data = res.data
      const foodCount = data.filter(d => d.category === 'FAST FOOD').length
      this.setState({
        countFood: foodCount,
        countDrink: data.length - foodCount
      })
    })
    list__users().then(res => {
      this.setState({
        countUser: res.data.length
      })
    })
  }

 

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
    const currentTheme = themeProps === 'light' ? theme[1] : theme[0];
    const cards = [
      {
        name: 'FOOD',
        percent: this.state.countFood,
        color: 'tomato'
      },
      {
        name: 'DRINK',
        percent: this.state.countDrink,
        color: '#1c2e4a'
      },
      {
        name: 'USER',
        percent: this.state.countUser,
        color: '#778899'
      }
    ]
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div className={styles.HomeWrapper} style={{ ...currentTheme }}>
        <div className={styles.CardArea}>
          {cards.map((e, i) => {
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
