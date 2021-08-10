import React, { Fragment, useContext, } from 'react'
import numeral from 'numeral'
import moment from 'moment'
import { filter, } from 'lodash'

import { Table, Popconfirm, Button, Typography, Tag, Tooltip, } from 'antd'
import { DeleteOutlined, QuestionCircleOutlined, EditOutlined, } from '@ant-design/icons'
import { PlayersContext } from '../contexts/PlayersContext'
import { SettingsContext } from '../contexts/SettingsContext'
import { PageContext } from '../contexts/PageContext'
import SlpIcon from './slp-icon.png'

const { Paragraph } = Typography

const TrackerTable = ({ loading, onDelete, onEdit, }) => {
  const {
		players,
    playersData,
    setSelectedPlayerData,
	} = useContext(PlayersContext)
  const {
    slpRatePeso,
	} = useContext(SettingsContext)
  const {
    setPlayerDataSidebarVisibility,
	} = useContext(PageContext)

  const getFromPlayersData = (ethAddress, dataKey, format) => {
    const playerData = filter(playersData, player => player.id.toLowerCase() === ethAddress.toLowerCase())
    if (playerData.length > 0) {
      const data = playerData[0][dataKey]
      switch (format) {
        case 'number':
          return numeral(data).format('0,0')
        case 'date':
          if (data === 0) {
            return '-'
          }
          return moment(data).format('MMM DD, hh:mm a')
        case 'date-from-now':
          if (data === 0) {
            return '-'
          }
          return moment(data).fromNow()
        case 'decimal':
          return numeral(data).format('0,0.0')
        default:
          return data;
      }
    }
    return '-'
  }

  const renderAddress = (text) => {
    const address = text.replace('0x', 'ronin:')
    const firstDigits = address.substring(0, 11)
    const lastDigits = address.substring(address.length - 5, address.length)

    return (
      <Paragraph 
        copyable={{ text: address.toLowerCase() }}
        style={{ color: '#a0a0a0' }}
      >
        { `${firstDigits}...${lastDigits}` }
      </Paragraph>
    )
  }

  const renderPlayer = (name, player) => {
    let {
      type,
      isko_share,
      account_name,
      address,
    } = player

    let playerType = type || 'Manager'
    let color = playerType === 'Manager' ? '#483e2b' : '#326379'
    if (isNaN(isko_share) || !isko_share) {
      isko_share = 0
    }

    let isClaimable = getFromPlayersData(player.address, 'isClaimable')

    return (
      <div>
        <div>
          <span style={{ fontWeight: 'bold' }}>{ name }</span>
          { account_name &&
            <span>&nbsp;|&nbsp;{ account_name }</span>
          }
        </div>
        <div>{ renderAddress(address) }</div>
        <div>
          { isko_share !== 0 &&
            <Fragment>
              <span>{`${isko_share} / ${100 - isko_share}`}</span>
              <span style={{ marginRight: '10px' }}></span>
            </Fragment>
          }
          <Tag color={ color }>{ playerType }</Tag>
          { isClaimable &&
            <Tooltip title="Claimable!">
              <img alt="SLP Icon" src={ SlpIcon } style={{ width: '17px' }}/>
            </Tooltip>
          }
        </div>
      </div>
    )
  }

  const renderButton = (_, record) => {
    return (
      <div>
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
        <Button 
          type="link" 
          icon={<EditOutlined />} 
          onClick={ () => handleEditPlayer(record) }
        />
      </div>
    )
  }

  const handleEditPlayer = (player) => {
    onEdit(player)
  }

  const renderScholarsShare = (_, player) => {
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
    const formattedSlpShare = numeral(shareInSLP).format('0,0.0')
    
    return (
      <div>
        <div><span>SLP:&nbsp;</span>{ formattedSlpShare }</div>
        <div><span>≈</span>{ shareInPeso }</div>
      </div>
    )
  }

  const renderManagersShare = (_, player) => {
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
    const formattedSlpShare = numeral(shareInSLP).format('0,0.0')

    return (
      <div>
        <div><span>SLP:&nbsp;</span>{ formattedSlpShare }</div>
        <div><span>≈</span>{ shareInPeso }</div>
      </div>
    )
  }

  const deletePlayer = (player) => {
    onDelete(player)
  }

  const handleRowClick = (player) => {
    const playerData = filter(playersData, p => p.id.toLowerCase() === player.address.toLowerCase())
    setSelectedPlayerData(playerData[0])
    setPlayerDataSidebarVisibility(true)
  }

  const columns = [
    {
      title: '',
      render: renderButton,
      width: 5,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 50,
      render: renderPlayer,
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'SLP',
      children: [
        {
          title: 'Claimed',
          dataIndex: 'address',
          key: 'address',
          width: 40,
          render: (_, record) => <span>{getFromPlayersData(record.address, 'claimable', 'number')}</span>
        },
        {
          title: 'Locked',
          dataIndex: 'address',
          key: 'address',
          width: 40,
          render: (_, record) => <span>{getFromPlayersData(record.address, 'lockedSlp', 'number')}</span>
        },
        {
          title: 'Total',
          dataIndex: 'address',
          key: 'address',
          width: 40,
          render: (_, record) => <span>{getFromPlayersData(record.address, 'total', 'number')}</span>
        },
        {
          title: 'Daily Avg',
          dataIndex: 'address',
          key: 'address',
          width: 40,
          render: (_, record) => <span>{getFromPlayersData(record.address, 'dailyAvg', 'decimal')}</span>
        },
      ]
    },
    {
      title: 'Split Share',
      children: [
        {
          title: 'Scholar',
          dataIndex: 'address',
          key: 'address',
          width: 40,
          render: renderScholarsShare
        },
        {
          title: 'Manager',
          dataIndex: 'address',
          key: 'address',
          width: 40,
          render: renderManagersShare
        }
      ]
    },
    {
      title: 'Last Claim',
      dataIndex: 'address',
      key: 'address',
      width: 80,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'lastClaimedAt', 'date-from-now')}</span>
    },
    {
      title: 'Next Claim Date',
      dataIndex: 'address',
      key: 'address',
      width: 100,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'nextClaimDate', 'date')}</span>
    }
  ]

  return (
    <div style={{ paddingBottom: '40px' }}>
      <Table 
        loading={ loading }
        dataSource={ players.value }
        columns={ columns }
        scroll={{ x: 700 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: e => handleRowClick(record)
          }
        }}
      />
    </div>
  )
}

export default TrackerTable