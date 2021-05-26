import React, {useState, useEffect,} from 'react'
import axios from 'axios'
import numeral from 'numeral'
import moment from 'moment'

const DataRow = ({ address }) => {
  const [ total, setTotal ] = useState(0)
  const [ claimable, setClaimable ] = useState(0)
  const [ lastClaimedAt, setLastClaimedAt ] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const res = await axios(`https://lunacia.skymavis.com/game-api/clients/${address}/items/1`);
      if (res.data) {
        setTotal(res.data.total || 0)
        setClaimable(res.data.claimable_total || 0)
        setLastClaimedAt(res.data.last_claimed_item_at || Date.now())
      }
    }
    fetchData()
  
  }, ['address'])

  const getDailyAvg = () => {
    const lastClaimDate = moment(new Date(lastClaimedAt * 1000))
    const dateNow = moment()
    const dateDiff = dateNow.diff(lastClaimDate, 'days')

    return numeral(total/dateDiff).format('0.0')
  }

  return (
    <div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Total SLP:&nbsp;</span>
        <span>{ numeral(total).format('0,0') }</span>
      </div>
      {/* <div>
        <span style={{ fontWeight: 'bold' }}>Claimable SLP:&nbsp;</span>
        <span>{ numeral(claimable).format('0,0') }</span>
      </div> */}
      <div>
        <span style={{ fontWeight: 'bold' }}>Daily Avg:&nbsp;</span>
        <span>{ getDailyAvg() }</span>
      </div>
    </div>
  )
}

export default DataRow
