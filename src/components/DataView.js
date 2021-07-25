import React from 'react'
import { Typography, } from 'antd'

const { Title } = Typography

const DataView = ({ value, title, style = {}, level = 4, small }) => {
  return (
    <div style={{...style}}>
      <div style={{ marginRight: '30px', color: 'gray' }}>{ title }</div>
      { small ?
        <div>{ value }</div>
        :
        <Title level={ level }>
          { value }
        </Title>
      }
      
    </div>
  )
}
export default DataView