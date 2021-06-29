import React, { useContext, } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { filter, } from 'lodash'

import { Table, Tag, } from 'antd'
import { PlayersContext } from '../contexts/PlayersContext'

const PlayerEarningsTable = () => {
  const {
		players,
    playersData,
    slpRatePeso,
	} = useContext(PlayersContext)

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

  const getIskoShare = (player, type) => {
    let shareInPeso = ''
    let shareInSLP = ''
    if (player.type === 'Manager') {
      return '-'
    }
    if (playersData) {
      const playerData = filter(playersData, p => p.id.toLowerCase() === player.address.toLowerCase())[0]
      if (playerData && player) {
        const iskosSharePercent = player.isko_share || 0
        let iskoShare = 0
        if (iskosSharePercent !== 0) {
          shareInSLP = (playerData.total * ( iskosSharePercent/100 ))
          iskoShare = shareInSLP * slpRatePeso
        }
        shareInPeso = `PHP ${numeral(iskoShare).format('0,0.00')}`
      }
    }
    if (type === 'slp') {
      return numeral(shareInSLP).format('0,0.0')
    }
    return shareInPeso
  }

  const getManagerShare = (player, type) => {
    let shareInPeso = '-'
    let shareInSLP = '-'
    if (playersData) {
      const playerData = filter(playersData, p => p.id.toLowerCase() === player.address.toLowerCase())[0]
      if (playerData && player) {
        const iskosSharePercent = player.isko_share || 0
        const managersSharePrecent = 100 - iskosSharePercent
        let managersShare = playerData.total * slpRatePeso
        shareInSLP = playerData.total
        if (iskosSharePercent !== 0) {
          shareInSLP = (playerData.total * ( managersSharePrecent/100 ))
          managersShare = shareInSLP * slpRatePeso
        }
        shareInPeso = `PHP ${numeral(managersShare).format('0,0.00')}`
      }
    }
    if (type === 'slp') {
      return numeral(shareInSLP).format('0,0.0')
    }
    return shareInPeso
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 10,
      render: renderPlayer,
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'SLP Earned',
      dataIndex: 'name',
      key: 'name',
      width: 10,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'total', 'number')}</span>
    },
    {
      title: 'Isko\'s Share',
      children: [
        {
          title: 'SLP',
          dataIndex: 'name',
          key: 'name',
          width: 10,
          render: (_, record) => <span>{getIskoShare(record, 'slp')}</span>
        },
        {
          title: 'Peso',
          dataIndex: 'name',
          key: 'name',
          width: 10,
          render: (_, record) => <span>{getIskoShare(record, 'peso')}</span>
        },
      ]
    },
    {
      title: 'Manager\'s Share',
      children: [
        {
          title: 'SLP',
          dataIndex: 'name',
          key: 'name',
          width: 10,
          render: (_, record) => <span>{getManagerShare(record, 'slp')}</span>
        },
        {
          title: 'Peso',
          dataIndex: 'name',
          key: 'name',
          width: 10,
          render: (_, record) => <span>{getManagerShare(record, 'peso')}</span>
        },
      ]
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