import React from 'react'
import EarningsSummary from './EarningsSummary'
// import PlayerEarningsTable from './PlayerEarningsTable'
import RatesView from './RatesView'

const EarningsView = () => {
  return (
    <div>
      <RatesView />
      <EarningsSummary />
      {/* <PlayerEarningsTable /> */}
    </div>
  )
}

export default EarningsView