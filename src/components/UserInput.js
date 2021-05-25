import React from 'react'

import { Input, Form, Button, } from 'antd'

const UserInput = ({ onSubmit }) => {
  // const [ form ] = Form.useForm()

  const onFinish = (values) => {
    let playersString = window.localStorage.getItem('players')
    let players = JSON.parse(playersString) || { value: [] }

    players.value.push({
      key: Date.now(),
      name: values.name || '',
      address: values.address || ''
    })
    window.localStorage.setItem('players', JSON.stringify(players))
    onSubmit(players)
    // form.resetFields()
  }

  return (
    <div
      style={{
        width:'50%',
        margin: 'auto'
      }}
    >
      <Form 
        onFinish={onFinish}
        name="axie-user-form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input player name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input player adrress' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UserInput