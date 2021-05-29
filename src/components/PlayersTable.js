import React from 'react'
import numeral from 'numeral'
import moment from 'moment'
import { filter, } from 'lodash'

import { Table, Popconfirm, Button, } from 'antd'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'

const PlayersTable = ({ loading, players, onDelete, playersData, }) => {

  const getFromPlayersData = (ethAddress, dataKey, format) => {
    const playerData = filter(playersData, player => player.id.toLowerCase() === ethAddress.toLowerCase())
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

  const deletePlayer = (player) => {
    onDelete(player)
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

  return (
    <Table 
      loading={ loading }
      dataSource={ players }
      columns={ columns }
      scroll={{ x: 1300 }}
    />
  )
}

export default PlayersTable