import './App.css';
import 'antd/dist/antd.css'
import React, { useState, useEffect, } from 'react'
import axios from 'axios'

import { Table } from 'antd'
import UserInput from './components/UserInput'
import RowComp from './components/RowComp';

function App() {
  const storagePlayers = JSON.parse(window.localStorage.getItem('players')) || { value: [] }
  const [ players, setPlayers ] = useState(storagePlayers)

  const renderSlp = (_, player) => {
    const fetchData = async () => {
      const result = await axios(`https://lunacia.skymavis.com/game-api/clients/${player.address}/items/1`);
      return result.data.total || 0
    }
 
    return fetchData() || 0
  }
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SLP',
      dataIndex: 'slp',
      key: 'slp',
      render: (_, record) => <RowComp address={ record.address }/>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  // useEffect(() => {
  //   getSlps()
  // })

  const handleSubmit = (players) => {
    setPlayers(players)
  }

  // const getSlps = () => {
  //   players.value.forEach(player => {
  //     if (!player.slp) {
  //       const res = fetchData(player)
  //       if (res.data) {
  //         player.slp = res.data.total
  //       }
  //     }
  //   })
  //   setPlayers(players)
  //  }

  // const fetchData = async (player) => {
  //   const result = await axios(
  //     `https://lunacia.skymavis.com/game-api/clients/${player.address}/items/1`,
  //   )
  //   return result.data
  // }

  return (
    <div 
      className="App"
      style={{
        padding: '100px'
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
