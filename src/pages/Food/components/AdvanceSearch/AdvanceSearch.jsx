import React from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'

const AdvancedSearch = props => {
  const [form] = Form.useForm()

  const getFields = () => {
    const fields = [
      {
        id: '1',
        name: 'category'
      },
      {
        id: '2',
        name: 'name'
      },
      {
        id: '3',
        name: 'isDelete'
      },
      {
        id: '4',
        name: 'status'
      }
    ]

    const res = fields.map((e, i) => {
      if (e.name !== 'isDelete') {
        return (
          <Col span={8} key={i}>
            <Form.Item
              name={`${e.name}`}
              label={`Field ${e.name}`}
            >
              <Input placeholder='placeholder' />
            </Form.Item>
          </Col>
        )
      } else {
        return (
          <Col span={8} key={i}>
            <Form.Item
              name={`${e.name}`}
              label={`Field ${e.name}`}
            >
              <Select style={{ width: '50%' }}>
                <Select.Option value={'true'}>true</Select.Option>
                <Select.Option value={'false'}>false</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        )
      }
    })

    return res
  }

  const onFinish = values => {
    props.cmdFilter(values)
    // console.log('Received values of form: ', values)
  }

  return (
    <Form
      form={form}
      name='advanced_search'
      className='ant-advanced-search-form'
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'right'
          }}
        >
          <Button type='primary' htmlType='submit'>
            Search
          </Button>
          <Button
            style={{
              margin: '0 8px'
            }}
            onClick={() => {
              form.resetFields();
              props.cmdRefresh('refresh')
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AdvancedSearch
