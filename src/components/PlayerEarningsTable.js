import React, { useContext, } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { filter, get, } from 'lodash'

import { Table, Typography, Tag, } from 'antd'
import { PlayersContext } from '../contexts/PlayersContext'

const { Paragraph } = Typography
const PlayerEarningsTable = () => {
  const {
		players,
    playersData,
    slpRatePeso,
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
        {/* <div>{ renderAddress(player.address) }</div> */}
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

  const getIskoShare = (player) => {
    if (playersData) {
      const playerData = filter(playersData, p => p.id.toLowerCase() === player.address.toLowerCase())[0]
      if (playerData && player) {
        const iskosSharePercent = get(player, 'isko_share', 0)
        let iskoShare = 0
        if (iskosSharePercent !== 0) {
          iskoShare = (playerData.total * ( iskosSharePercent/100 )) * slpRatePeso
        }
        return numeral(iskoShare).format('0,0.00')
      }
    }
    return '-'
  }

  const getManagerShare = (player) => {
    if (playersData) {
      const playerData = filter(playersData, p => p.id.toLowerCase() === player.address.toLowerCase())[0]
      if (playerData && player) {
        const iskosSharePercent = get(player, 'isko_share', 0)
        const managersSharePrecent = 100 - iskosSharePercent
        let managersShare = 0
        if (iskosSharePercent !== 0) {
          managersShare = (playerData.total * ( managersSharePrecent/100 )) * slpRatePeso
        }
        return numeral(managersShare).format('0,0.00')
        
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
    {
      title: 'Isko\'s Share (Peso)',
      dataIndex: 'name',
      key: 'name',
      width: 10,
      render: (_, record) => <span>{getIskoShare(record)}</span>
    },
    {
      title: 'Manager\'s Share (Peso)',
      dataIndex: 'name',
      key: 'name',
      width: 10,
      render: (_, record) => <span>{getManagerShare(record)}</span>
    },
  ]

  return (
    <Table 
      scroll={{ x: 700 }}
      dataSource={ players.value }
      columns={ columns }
    />
  )
}

export default PlayerEarningsTable