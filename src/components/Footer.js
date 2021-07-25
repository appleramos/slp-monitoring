import React from 'react'
import { 
  CloudDownloadOutlined, 
  QuestionCircleOutlined, 
  UploadOutlined,
} from '@ant-design/icons'
import { Button, Popconfirm, Upload, Modal, } from 'antd'
import DonationView from './DonationView'

const Footer = ({ onUpload, onBeforeUpload, onDownload, onDownloadCsv, }) => {
  const handleDonate = () => {
    Modal.info({
      title: 'Donation channels',
      content: (
        <DonationView />
      ),
      onOk() {},
    })
  }

  return (
    <div style={{ 
      display: 'flex',
      position: 'fixed',
      bottom: 0,
      backgroundColor: 'white',
      width: '100%',
      left: 0,
      padding: '11px 15px', 
    }}>
      <div style={{ flexGrow: 3 }}>
        <span style={{ color: 'gray' }}>© 2021 apple-bit</span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Popconfirm 
          title="This will export a CSV file of your data"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={ onDownloadCsv }
        >
          <Button 
            size="small"
            shape="round" 
            style={{ marginRight: '10px', marginBottom: '5px' }}
            icon={<CloudDownloadOutlined />} 
          >
            .csv
          </Button>
        </Popconfirm>
        <Popconfirm 
          title="This will export a JSON file of your data"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={ onDownload }
        >
          <Button 
            size="small"
            shape="round" 
            style={{ marginRight: '10px', marginBottom: '5px' }}
            icon={<CloudDownloadOutlined />} 
          >
            .json
          </Button>
        </Popconfirm>
        <Upload 
          name="players_json"
          accept=".json"
          maxCount={1}
          action={ onUpload }
          beforeUpload={ onBeforeUpload }
          showUploadList={ false }
        >
          <Button 
            size="small"
            shape="round" 
            icon={<UploadOutlined />}
          >
            Import (JSON)
          </Button>
        </Upload>
      </div>
    </div>
  )
}

export default Footer