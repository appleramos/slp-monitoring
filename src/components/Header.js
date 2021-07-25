import React from 'react'
import { Button } from 'antd'
import { 
  RedoOutlined, 
  PlusOutlined, 
} from '@ant-design/icons'

const Header = ({ onReload, onOpenForm }) => {
  return (
    <div
      style={{
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginBottom: '10px',
        display: 'flex'
      }}
    >
      <div style={{ flexGrow: '3' }}>
        <span>Scholar Tracker</span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button 
          size="large"
          shape="circle" 
          icon={<RedoOutlined />} 
          style={{ marginRight: '10px', marginBottom: '5px' }}
          onClick={ onReload }
        />
        <Button 
          size="large"
          type="primary" 
          shape="round" 
          icon={<PlusOutlined />} 
          onClick={ onOpenForm }
        >
          Player
        </Button>
      </div>
    </div>
  )
}

export default Header
