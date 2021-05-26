import React, {useState, useEffect,} from 'react'
import axios from 'axios'
import numeral from 'numeral'

const RowComp = ({ address }) => {
  const [ result, setResult ] = useState('-')
  useEffect(() => {
    async function fetchData() {
      const res = await axios(`https://lunacia.skymavis.com/game-api/clients/${address}/items/1`);
      if (res.data) {
        setResult(res.data.total || '-');
      }
    }
    fetchData()
  
  }, ['address']);

  return (
    <div>
      { numeral(result).format('0,0') }
    </div>
  )
}

export default RowComp
