import React, { Fragment, useContext, } from 'react'
import numeral from 'numeral'
import moment from 'moment'
import { filter, } from 'lodash'

import { Table, Popconfirm, Button, Typography, Tag, Tooltip, } from 'antd'
import { DeleteOutlined, QuestionCircleOutlined, EditOutlined, } from '@ant-design/icons'
import { PlayersContext } from '../contexts/PlayersContext'
import SlpIcon from './slp-icon.png'

const { Paragraph } = Typography

const PlayerMonitoringTable = ({ loading, onDelete, onEdit, }) => {
  const {
		players,
    playersData,
	} = useContext(PlayersContext)

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
          return moment(new Date(data * 1000)).format('LLL')
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

    return <Paragraph copyable={{ text: address.toLowerCase() }}>{ `${firstDigits}...${lastDigits}` }</Paragraph>
  }

  const renderPlayer = (name, player) => {
    let {
      type,
      isko_share,
      account_name,
      address,
    } = player

    let playerType = type || 'Manager'
    let color = playerType === 'Manager' ? 'gold' : 'cyan'
    if (isNaN(isko_share) || !isko_share) {
      isko_share = 0
    }

    let nextClaimDateData = getFromPlayersData(player.address, 'nextClaimDate')
    let nextClaimDate = moment(nextClaimDateData)
    let isClaimable = moment().isSameOrAfter(nextClaimDate)

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

  const deletePlayer = (player) => {
    onDelete(player)
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
      width: 90,
      render: renderPlayer,
      sorter: (a, b) => a.name.localeCompare(b.name)
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
      render: (_, record) => <span>{getFromPlayersData(record.address, 'lastClaimedAt', 'none')}</span>
    },
    {
      title: 'Next Claim Date',
      dataIndex: 'address',
      key: 'address',
      width: 150,
      render: (_, record) => <span>{getFromPlayersData(record.address, 'nextClaimDate', 'none')}</span>
    }
  ]

  return (
    <Table 
      loading={ loading }
      dataSource={ players.value }
      columns={ columns }
      scroll={{ x: 1300 }}
    />
  )
}

export default PlayerMonitoringTable