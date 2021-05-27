import React from 'react'

import { Input, Form, Button, message, Modal, } from 'antd'
import { filter } from 'lodash'

const UserInput = ({ onSubmit, onCancel, visible }) => {
  const [ form ] = Form.useForm()

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
    form.resetFields()
  }

  const handleCancel = () => {
    onCancel()
  }

  const handleOk = () => {
    onFinish(form.getFieldsValue())
  }

  return (
    <Modal
      title="Add an Isko"
      visible={ visible }
      onOk={ handleOk } 
      onCancel={ handleCancel }
      closable={ false }
    >
      <Form 
        onFinish={ onFinish }
        name="axie-user-form"
        form={form}
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
      </Form>
    </Modal>
  )
}

export default UserInput