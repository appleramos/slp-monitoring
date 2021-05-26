import './App.css';
import 'antd/dist/antd.css'
import React, { useState, } from 'react'
import { filter } from 'lodash'

import { Table, Popconfirm, Button, message, } from 'antd'
import { DeleteOutlined, QuestionCircleOutlined, } from '@ant-design/icons';

import UserInput from './components/UserInput'
import DataRow from './components/DataRow';

function App() {
  const storagePlayers = JSON.parse(window.localStorage.getItem('players')) || { value: [] }
  const [ players, setPlayers ] = useState(storagePlayers)

  const renderAddress = (text) => {
    const firstDigits = text.substring(0, 4)
    const lastDigits = text.substring(text.length - 5, text.length)
    return `${firstDigits}...${lastDigits}`
  }

  const renderButton = (_, record) => {
    return (
      <Popconfirm 
        title={ `Are you sure you want to delete ${record.name}?`}
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        onConfirm={ () => deletePlayer(record) }
      >
        <Button 
          type="link" 
          danger 
          icon={<DeleteOutlined />} 
        />
      </Popconfirm>
    )
  }
  const columns = [
    {
      title: 'Action',
      render: renderButton,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Player Data',
      dataIndex: 'slp',
      key: 'slp',
      render: (_, record) => <DataRow address={ record.address }/>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: renderAddress
    },
  ]

  const handleSubmit = (players) => {
    setPlayers(players)
  }

  const deletePlayer = (player) => {
    const newPlayers = filter(players.value, (p) => p.key !== player.key) //players.value.splice(index, 1)
    setPlayers({value: newPlayers})
    window.localStorage.setItem('players', JSON.stringify({value: newPlayers}))
    message.success(`Successfully deleted ${player.name}`);
  }

  return (
    <div 
      className="SLP_Monitoring_App"
      style={{
        paddingTop: '40px',
        maxWidth: '80%',
        margin: 'auto'
      }}
    >
      <UserInput onSubmit={ handleSubmit }/>
      <Table 
        dataSource={ players.value }
        columns={ columns }
      />
    </div>
  );
}

export default App;
