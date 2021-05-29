import React, { useContext, } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { filter, } from 'lodash'

import { Table, Typography, } from 'antd'
import { PlayersContext } from '../contexts/PlayersContext'

const { Paragraph } = Typography
const PlayerEarningsTable = () => {
  const {
		players,
    playersData,
	} = useContext(PlayersContext)

  const renderAddress = (text) => {
    const firstDigits = text.substring(0, 6)
    const lastDigits = text.substring(text.length - 5, text.length)

    return <Paragraph copyable={{ text: text.toLowerCase() }}>{ `${firstDigits}...${lastDigits}` }</Paragraph>
  }

  const renderPlayer = (name, player) => {
    return (
      <div>
        <div style={{ fontWeight: 'bold' }}>{ name }</div>
        <div>{ renderAddress(player.address) }</div>
      </div>
    )
  }

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 10,
      render: renderPlayer
    },
    {
      title: 'SLP Earned',
      dataIndex: 'name',
      key: 'name',
      width: 10,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'total', 'number')}</span>
    },
  ]

  return (
    <Table 
      scroll={{ x: 1300 }}
      dataSource={ players.value }
      columns={ columns }
    />
  )
}

export default PlayerEarningsTable