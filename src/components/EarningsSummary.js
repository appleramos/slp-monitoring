import React, { useContext } from 'react'
import { filter } from 'lodash'
import numeral from 'numeral'

import { PlayersContext } from '../contexts/PlayersContext'
import DataView from './DataView'

const EarningsSummary = () => {
  const {
		players,
    playersData,
    slpRatePeso,
	} = useContext(PlayersContext)

  const getIskosTotalEarnings = () => {
    let total = 0
    const iskos = filter(players.value, { type: 'Isko' })
    iskos.forEach(isko => {
      const { isko_share, address } = isko
      const pData = filter(playersData, p => p.id.toLowerCase() === address.toLowerCase())
      if (pData.length > 0) {
        const iskoSlpShare = pData[0].total * (isko_share / 100)
        total += iskoSlpShare * slpRatePeso
      }
    })
    return `PHP ${numeral(total).format('0,0.00')}`
  }

  const getManagersTotalEarnings = () => {
    let total = 0
    players.value.forEach(player => {
      const { address, type, isko_share, } = player
      const pData = filter(playersData, p => p.id.toLowerCase() === address.toLowerCase())
      if (pData.length > 0) {
        if (type === 'Isko') {
          const managersShare = 100 - isko_share
          total += pData[0].total * (managersShare / 100) * parseFloat(slpRatePeso)
        } else {
          total += pData[0].total * parseFloat(slpRatePeso)
        }
      }
      
    })
    return `PHP ${numeral(total).format('0,0.00')}`
  }

  return (
    <div style={{ display: 'flex', marginBottom: '15px', flexWrap: 'wrap' }}>
      <DataView 
        title="Manager's Total Earnings"
        value={ getManagersTotalEarnings() }
        style={{ marginRight: '20px' }}
      />
      <DataView 
        title="Iskos' Total Earnings"
        value={ getIskosTotalEarnings() }
      />
    </div>
  )
}

export default EarningsSummary