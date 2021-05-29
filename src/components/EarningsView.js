import React from 'react'
import PlayerEarningsTable from './PlayerEarningsTable'

const EarningsView = ({ players, playersData }) => {
  return (
    <div>
      <PlayerEarningsTable 
        players={ players }
        playersData={ playersData }
      />
    </div>
  )
}

export default EarningsView