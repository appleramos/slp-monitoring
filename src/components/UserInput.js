import React from 'react'

import { Input, Form, Button, message, } from 'antd'
import { filter } from 'lodash'

const UserInput = ({ onSubmit }) => {
  // const [ form ] = Form.useForm()

  const onFinish = (values) => {
    let playersString = window.localStorage.getItem('players')
    let players = JSON.parse(playersString) || { value: [] }

    const existingPlayer = filter(players.value, (player) => player.address === values.address)
    if (existingPlayer.length > 0) {
      message.warning('The address you entered is already in the list');
      return
    }

    onSubmit({
      key: Date.now(),
      name: values.name || '',
      address: values.address || ''
    })
    // form.resetFields()
  }

  return (
    <div
      style={{
        margin: 'auto',
        backgroundColor: '#24283512',
        borderRadius: '15px',
        padding: '25px 25px 1px 25px',
        marginBottom: '25px',
        maxWidth: '500px',
      }}
    >
      <Form 
        onFinish={onFinish}
        name="axie-user-form"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input player name' }]}
        >
          <Input placeholder="Name *"/>
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: 'Please input player adrress' }]}
        >
          <Input placeholder="Etherium address *"/>
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