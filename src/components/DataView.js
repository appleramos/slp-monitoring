import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

export default DataView = ({ value, title, style = {}, }) => {
  return (
    <div style={{...style}}>
      <div style={{ marginRight: '30px', color: 'gray' }}>{ title }</div>
      <Title level={4}>
        { value }
      </Title>
    </div>
  )
}
