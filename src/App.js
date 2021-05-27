import './App.css';
import 'antd/dist/antd.css'
import React, { useState, useEffect, } from 'react'
import { filter, cloneDeep, } from 'lodash'
import axios from 'axios'
import numeral from 'numeral'
import moment from 'moment'

import { Table, Popconfirm, Button, message, } from 'antd'
import { DeleteOutlined, QuestionCircleOutlined, RedoOutlined, PlusOutlined, } from '@ant-design/icons'

import UserInput from './components/UserInput'

function App() {
  const storagePlayers = JSON.parse(window.localStorage.getItem('players')) || { value: [] }
  const [ players, setPlayers ] = useState(storagePlayers)
  const [ playersData, setPlayersData ] = useState([])
  const [ tableLoading, setTableLoading ] = useState(true)
  const [ isFormVisible, setIsFormVisible ] = useState(false)

  useEffect(() => {
    loadPlayerData()
  }, ['players'])

  const loadPlayerData = () => {
    let newPlayersData = []

    async function fetchData(player) {
      try {
        const res = await axios(`https://lunacia.skymavis.com/game-api/clients/${player.address}/items/1`)
        if (res.data) {
          const {
            client_id,
            total,
            claimable_total,
            last_claimed_item_at,
          } = res.data
          newPlayersData.push({
            id: client_id,
            total: total || 0,
            claimable: claimable_total || 0,
            lockedSlp: total - claimable_total,
            lastClaimedAt: last_claimed_item_at,
            dailyAvg: getDailyAvg(last_claimed_item_at, total),
            nextClaimDate: getNextClaimDate(last_claimed_item_at)
          })
        }
      } catch (err) {
        newPlayersData.push({
          id: `invalid-user-${player.address}`,
          total: 0,
          claimable: 0,
          lockedSlp: 0,
          lastClaimedAt: moment(),
          dailyAvg: 0,
          nextClaimDate: moment()
        })
      }
      setPlayersData(newPlayersData)
      if (newPlayersData.length === players.value.length) {
        setTableLoading(false)
      }
    }
    players.value.forEach((player) => {
      fetchData(player)
    })
  }

  const renderAddress = (text) => {
    const firstDigits = text.substring(0, 6)
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

  const getDailyAvg = (lastClaimedAt, total) => {
    const lastClaimDate = moment(new Date(lastClaimedAt * 1000))
    const dateNow = moment()
    const dateDiff = dateNow.diff(lastClaimDate, 'days')

    return total/dateDiff
  }

  const getNextClaimDate = (lastClaimedAt) => {
    const lastClaimDate = moment(new Date(lastClaimedAt * 1000))
    return lastClaimDate.add(14, 'days').format('LLL')
  }

  const getFromPlayersData = (ethAddress, dataKey, format) => {
    const playerData = filter(playersData, player => player.id === ethAddress)
    if (playerData.length > 0) {
      const data = playerData[0][dataKey]
      switch (format) {
        case 'number':
          return numeral(data).format('0,0')
        case 'date':
          return moment(new Date(data * 1000)).format('LLL')
        case 'decimal':
          return numeral(data).format('0.0')
        default:
          return data;
      }
    }
    return '-'
  }

  const columns = [
    {
      title: '',
      render: renderButton,
      width: 5,
      // fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 10,
      // fixed: 'left',
    },
    {
      title: 'Claimed SLP',
      dataIndex: 'address',
      key: 'address',
      width: 50,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'claimable', 'number')}</span>
    },
    {
      title: 'Locked SLP',
      dataIndex: 'address',
      key: 'address',
      width: 50,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'lockedSlp', 'number')}</span>
    },
    {
      title: 'Total SLP',
      dataIndex: 'address',
      key: 'address',
      width: 50,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'total', 'number')}</span>
    },
    {
      title: 'Daily Avg',
      dataIndex: 'address',
      key: 'address',
      width: 50,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'dailyAvg', 'decimal')}</span>
    },
    {
      title: 'Last Claim Date',
      dataIndex: 'address',
      key: 'address',
      width: 150,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'lastClaimedAt', 'date')}</span>
    },
    {
      title: 'Next Claim Date',
      dataIndex: 'address',
      key: 'address',
      width: 150,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'nextClaimDate', 'none')}</span>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 50,
      render: renderAddress
    },
  ]

  const handleSubmit = (player) => {
    setTableLoading(true)
    const newPlayersData = cloneDeep(playersData)
    axios(`https://lunacia.skymavis.com/game-api/clients/${player.address}/items/1`)
      .then(res => {
        const newPlayers = cloneDeep(players)
        if (res.data) {
          const {
            client_id,
            total,
            claimable_total,
            last_claimed_item_at,
          } = res.data
          newPlayersData.push({
            id: client_id,
            total: total || 0,
            claimable: claimable_total || 0,
            lockedSlp: total - claimable_total,
            lastClaimedAt: last_claimed_item_at,
            dailyAvg: getDailyAvg(last_claimed_item_at, total),
            nextClaimDate: getNextClaimDate(last_claimed_item_at)
          })
        }
        setTableLoading(false)
        setPlayersData(newPlayersData)
        newPlayers.value.push(player)
        window.localStorage.setItem('players', JSON.stringify(newPlayers))
        setPlayers(newPlayers)
      })
      .catch(err => {
        message.error('You entered an invalid etherium address')
        setTableLoading(false)
      })
      setIsFormVisible(false)
  }

  const deletePlayer = (player) => {
    const newPlayers = filter(players.value, (p) => p.key !== player.key) 
    const newPlayersData = filter(playersData, p => p.id !== player.address)
    setPlayers({value: newPlayers})
    setPlayersData(newPlayersData)
    window.localStorage.setItem('players', JSON.stringify({value: newPlayers}))
    message.success(`Successfully deleted ${player.name}`)
  }

  const handleOpenForm = () => {
    setIsFormVisible(true)
  }

  const handleCancelForm = () => {
    setIsFormVisible(false)
  }

  const handleReload = () => {
    const newPlayersData = []
    setTableLoading(true)
    setPlayersData(newPlayersData)
    loadPlayerData()
  }

  return (
    <div 
      className="SLP_Monitoring_App"
      style={{
        padding: '15px 25px',
        margin: 'auto'
      }}
    >
      <div
        style={{
          fontSize: '1.5em',
          fontWeight: 'bold',
          marginBottom: '10px',
          display: 'flex'
        }}
      >
        <div style={{ flexGrow: '3' }}>SLP Tracker</div>
        <Button 
          size="large" 
          shape="circle" 
          icon={<RedoOutlined />} 
          style={{ marginRight: '20px' }}
          onClick={ handleReload }
        />
        <Button 
          size="large" 
          type="primary" 
          shape="round" 
          icon={<PlusOutlined />} 
          onClick={ handleOpenForm }
        >
          Isko
        </Button>
      </div>
      <UserInput 
        onSubmit={ handleSubmit } 
        visible={ isFormVisible }
        onCancel={ handleCancelForm }
      />
      <Table 
        loading={ tableLoading }
        dataSource={ players.value }
        columns={ columns }
        scroll={{ x: 1300 }}
      />
    </div>
  );
}

export default App;
