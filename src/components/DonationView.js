import React from 'react'
import DataView from './DataView'
const DonationView = () => {
  return (
    <div>
      <DataView 
        title="Ronin Address [apple-bit | AxieLog01]"
        value="ronin:73d68a12fcede1b6a4ce3189dbefc89a10fafaff"
        level={ 5 }
        style={{ marginTop: '20px' }}
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