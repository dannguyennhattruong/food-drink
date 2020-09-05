import React, { PureComponent } from 'react'
import { Table, Tag, Image, Switch, message, Button, Divider } from 'antd'
import styles from './Food.module.scss'
import { list__foods, delete__food } from '../../services/food.service'
import { formatTime } from '../../utils'
import { Context as AppContext } from '../../store/app/appContext'
import EditFood from './components/EditFood/EditFood'
import AdvancedSearch from './components/AdvanceSearch/AdvanceSearch'

class Food extends PureComponent {
  static contextType = AppContext
  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      isLoading: false,
      dataFoods: [],
      colunmsTable: [],
      dataTable: [],
      showEdit: false
    }
  }

  OnDeleteFood = (r, event) => {
    this.setState({ isLoading: true })
    delete__food(r.id)
      .then(res => {
        this.refreshPage()
        message.success(
          `Bạn đã ${!r.isDelete ? 'xóa' : 'phục hồi'} một hàng hóa có tên là ${
            r.name
          } thành công !!`
        )
      })
      .catch(e => {
        console.log(e)
        this.setState({ hasError: { ...this.state.hasError, e } })
      })
  }

  refreshPage = () => {
    this.setState({ isLoading: true }, () => {
      list__foods().then(res => {
        // console.log(res)
        this.setState({ dataFoods: res.data })
        const foods = [...this.state.dataFoods]
        const keys = Object.keys(foods[0])
        const rmSymbol = ['__v', '_id']
        const mapKeysToColumn = keys
          .filter(k => !rmSymbol.includes(k))
          .reverse()
          .map(k => {
            if (k === 'status') {
              return {
                title: k,
                dataIndex: k,
                key: k,
                render: (k, r) => (
                  <Tag key={r.id} color='volcano'>
                    {k.toUpperCase()}
                  </Tag>
                )
              }
            }

            if (k === 'images') {
              return {
                title: k,
                dataIndex: k,
                key: k,
                render: (k, r) => (
                  <div
                    key={r.id}
                    style={{
                      height: '100px',
                      width: '100px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      background: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {k.length !== 0 ? (
                      k.map((e, i) => {
                        return (
                          <Image
                            key={e}
                            preview
                            className={styles.imageTable}
                            style={{
                              width: `calc(100%/2)`
                              // flexGrow: 1,
                              // margin: '5px'
                            }}
                            src={e}
                            fallback='Ảnh đang lỗi'
                          />
                        )
                      })
                    ) : (
                      <Tag key={r.id} color='volcano'>
                        {'No images 😅'.toUpperCase()}
                      </Tag>
                    )}
                  </div>
                )
              }
            }
            if (['updatedAt', 'createdAt'].includes(k)) {
              return {
                title: k,
                dataIndex: k,
                key: k,
                render: (k, r) => <p key={r.id}>{formatTime(k)}</p>
              }
            }
            if (k === 'isDelete') {
              return {
                title: k,
                dataIndex: k,
                key: k,
                render: (k, r) => (
                  <Switch
                    key={r.id}
                    className={k}
                    checked={k}
                    onChange={() => this.OnDeleteFood(r)}
                  />
                )
              }
            }
            return {
              title: k,
              dataIndex: k,
              key: k,
              render: (k, r) => <p key={r.id}>{k}</p>
            }
          })
        this.setState({
          colunmsTable: mapKeysToColumn
        })

        this.setState({ isLoading: false })
      })
    })
  }

  onShowEditFood = () => this.setState({ showEdit: true })

  componentDidMount () {
    this.refreshPage()
  }

  getAction = value => {
    if (value === 'close') {
      this.setState({ showEdit: false })
    }
  }

  cmdRefresh = value => {
    if (value === 'refresh') {
      this.refreshPage()
    }
  }

  filterData = values => {
    this.setState({ isLoading: true }, () => {
      const dataFilter = [...this.state.dataFoods]
      let resultArray = []
      if (Object.keys(values).length !== 0) {
        Object.entries(values).forEach(([key, value]) => {
          if (value !== undefined) {
            resultArray = dataFilter.filter(d => {
              if(key !=='isDelete') {
                return d[key] === value
              }
              else {
                return d[key].toString() === value
              }
            })
          }
        })
      }

      setTimeout(() => {
        this.setState({ dataFoods: resultArray })
        this.setState({ isLoading: false })
      }, 1000)
    })
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div className={styles.FoodWrapper}>
        <Button
          type='primary'
          style={{ marginBottom: '5px' }}
          onClick={this.onShowEditFood}
        >
          Tạo mới{' '}
          <span role='img' aria-label='' style={{ marginLeft: '6px' }}>
            ➕
          </span>
        </Button>

        <AdvancedSearch cmdFilter={this.filterData} cmdRefresh={this.cmdRefresh}/>
        <Divider />
        {this.state.showEdit && (
          <EditFood action={this.getAction} command={this.cmdRefresh} />
        )}

        <Table
          style={{ width: '100%' }}
          loading={this.state.isLoading}
          title={() => (
            <p
              style={{
                textTransform: 'uppercase',
                fontSize: '20px',
                fontWeight: '700'
              }}
            >
              Danh sách thức ăn và nước uống
            </p>
          )}
          footer={() => 'Night is  Light'}
          columns={this.state.colunmsTable}
          dataSource={this.state.dataFoods}
          // rowClassName={() => 'editable-row'}
        />
      </div>
    )
  }
}

Food.propTypes = {
  // bla: PropTypes.string,
}

Food.defaultProps = {
  // bla: 'test',
}

export default Food
