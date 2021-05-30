import React, { useState, useContext, } from 'react'

import { Input, Form, message, Modal, Radio, InputNumber, } from 'antd'
import { filter, get, } from 'lodash'
import { PlayersContext } from '../contexts/PlayersContext'

const UserInput = ({ onSubmit, onCancel, visible, }) => {
  const {
		selectedPlayer,
	} = useContext(PlayersContext)

  let sShare = parseInt(get(selectedPlayer, 'isko_share', 0))

  const [ managersShare, setManagersShare ] = useState(100 - sShare)
  const [ isIsko, setIsIsko ] = useState(get(selectedPlayer, 'type', 'Manager') === 'Isko')
  const [ form ] = Form.useForm()

  const onFinish = (values) => {
    let playersString = window.localStorage.getItem('players')
    let players = JSON.parse(playersString) || { value: [] }
    const {
      name,
      address,
      type,
      isko_share,
    } = values

    if (!selectedPlayer.name) {
      const existingPlayer = filter(players.value, (player) => player.address === values.address)
      if (existingPlayer.length > 0) {
        message.warning('The address you entered is already in the list');
        return
      }
    }
  
    const scholarsShare = isko_share === '' ? 0 : parseInt(isko_share)
    onSubmit({
      key: Date.now(),
      name: name || '',
      address: address || '',
      type,
      isko_share: scholarsShare
    })
    form.resetFields()
  }

  const handleCancel = () => {
    onCancel()
  }

  const handleOk = () => {
    onFinish(form.getFieldsValue())
  }

  const handleFieldsChange = () => {
    const values = form.getFieldValue()
    const {
      isko_share,
      type
    } = values

    setIsIsko(type === 'Isko')

    let iskosShare = isko_share === '' ? 0 : parseInt(isko_share)
    let managersShare = 100 - iskosShare
    if (iskosShare > 100) {
      setManagersShare(0)
      return
    }
    setManagersShare(managersShare)
  }

  return (
    <Modal
      title={ selectedPlayer.name ? 'Edit Player' : 'Add a Player'}
      visible={ visible }
      onOk={ handleOk } 
      onCancel={ handleCancel }
      closable={ false }
    >
      <Form 
        onFinish={ onFinish }
        name="axie-user-form"
        form={form}
        onFieldsChange={ handleFieldsChange }
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input player name' }]}
          initialValue={ selectedPlayer.name }
        >
          <Input placeholder="Name *"/>
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: 'Please input player address' }]}
          initialValue={ selectedPlayer.address }
        >
          <Input placeholder="Etherium address *"/>
        </Form.Item>
        <Form.Item 
          label="Type" 
          name="type"
          initialValue={ get(selectedPlayer, 'type', 'Manager') }
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="Isko">Isko</Radio.Button>
            <Radio.Button value="Manager">Manager</Radio.Button>
          </Radio.Group>
        </Form.Item>
        { isIsko &&
          <Form.Item
            label="Isko's share"
            name="isko_share"
            rules={[{ required: true, message: 'Please input isko\'s share' }]}
            initialValue={ get(selectedPlayer, 'isko_share', 60) }
            help={ `Manager's share is ${managersShare}%` }
            rules={[{ required: isIsko, message: 'Isko\'s share is required' }]}
          >
            <InputNumber
              placeholder="Isko's share"
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              disabled={ !isIsko }
            />
          </Form.Item>
        }
      </Form>
    </Modal>
  )
}

export default UserInput