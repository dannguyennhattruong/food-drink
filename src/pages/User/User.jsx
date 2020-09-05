import React, { PureComponent } from 'react'
import { list__users, update__user } from '../../services/user.service'
import styles from './User.module.scss'
import { Switch, Tag, message, Table } from 'antd'
import { formatTime } from '../../utils'

class User extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      users: [],
      isLoading: false,
      colunmsTable: []
    }
  }

  onDeleteUser = r => {
    console.log(r)
    update__user(r.id, { isDelete: !r.isDelete })
      .then(res => {
        console.log(res.data)
        this.refreshPage();
        message.success(
          `Bạn đã ${!r.isDelete ? 'xóa' : 'phục hồi'} một người dùng có tên là ${
            r.email
          } thành công !!`
        )
      })
      .catch(e => message.error('Đã có lỗi xảy ra !!'))
  }

  onActiveUser = r => {
    update__user(r.id, { isActive: !r.isActive })
      .then(res => {
        this.refreshPage();
        message.success(
          `Bạn đã ${!r.isActive ? 'kích hoạt' : 'hủy kích hoạt'} một người dùng có tên là ${
            r.email
          } thành công !!`
        )
      })
      .catch(e => message.error('Đã có lỗi xảy ra !!'))
  }

  refreshPage = () => {
    this.setState({ isLoading: true })
    list__users()
      .then(res => {
        this.setState({ users: res.data })
        const users_list = [...this.state.users]
        const keys = Object.keys(users_list[0])
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
                    onChange={() => this.onDeleteUser(r)}
                  />
                )
              }
            }
            if (k === 'isActive') {
              return {
                title: k,
                dataIndex: k,
                key: k,
                render: (k, r) => (
                  <Switch
                    key={r.id}
                    className={k}
                    checked={k}
                    onChange={() => this.onActiveUser(r)}
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
      .catch(e => this.setState({ hasError: true }))
  }

  componentDidMount () {
    this.refreshPage()
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div className={styles.UserWrapper}>
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
              Danh sách thành viên
            </p>
          )}
          footer={() => 'Night is  Light'}
          columns={this.state.colunmsTable}
          dataSource={this.state.users}
          // rowClassName={() => 'editable-row'}
        />
      </div>
    )
  }
}

User.propTypes = {
  // bla: PropTypes.string,
}

User.defaultProps = {
  // bla: 'test',
}

export default User
