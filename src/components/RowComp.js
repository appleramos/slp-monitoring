import React, {useState, useEffect,} from 'react'
import axios from 'axios'
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
      { result }
    </div>
  )
}

export default RowComp
