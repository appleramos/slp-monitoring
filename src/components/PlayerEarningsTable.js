import React, { useContext, } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { filter, } from 'lodash'

import { Table, Typography, Tag, } from 'antd'
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
    const {
      type,
      isko_share
    } = player

    let playerType = type || 'Manager'
    let color = playerType === 'Manager' ? 'gold' : 'cyan'
    return (
      <div>
        <div>
          <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{ name }</span>
          <Tag color={ color }>{ playerType }</Tag>
        </div>
        <div>{ renderAddress(player.address) }</div>
        { playerType === 'Isko' &&
          `${isko_share} / ${100 - isko_share}`
        }
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