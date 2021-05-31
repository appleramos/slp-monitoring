import React from 'react'
import DataView from './DataView'
import GCash from './gcash.jpg'
const DonationView = () => {
  return (
    <div>
      <DataView 
        title="Ronin Address [apple-bit]"
        value="ronin:786521e1ef005f71b9b454e6e4be48bdc645a3c6"
        level={ 5 }
        style={{ marginTop: '20px' }}
      />
      <DataView 
        title="GCash"
        style={{ marginTop: '20px' }}
        value={
          <img src={ GCash } style={{ width: '50%' }}/>
        }
        level={ 5 }
      />
      <DataView 
        title="Developer"
        style={{ marginTop: '20px' }}
        value="Apple Ramos"
        small
      />
    </div>
  )
}

export default DonationView