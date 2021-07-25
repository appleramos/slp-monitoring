import React from 'react'
import { Typography, } from 'antd'

const { Title } = Typography

const DataView = ({ value, title, style = {}, level = 4, small }) => {
  return (
    <div style={{...style}}>
      <div style={{ marginRight: '30px', color: '#a0a0a0' }}>{ title }</div>
      { small ?
        <div style={{ color: 'white' }}>{ value }</div>
        :
        <Title 
          level={ level }
          style={{ color: 'white' }}
        >
          { value }
        </Title>
      }
      
    </div>
  )
}
export default DataView