import React from 'react'
import { 
  CloudDownloadOutlined, 
  QuestionCircleOutlined, 
  UploadOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, Popconfirm, Upload, Modal, } from 'antd'
// import DonationView from './DonationView'

const Footer = ({ onUpload, onBeforeUpload, onDownload, onDownloadCsv, }) => {
  // const handleDonate = () => {
  //   Modal.info({
  //     title: 'Donation channels',
  //     content: (
  //       <DonationView />
  //     ),
  //     onOk() {},
  //   })
  // }

  const handleSettings = () => {
    Modal.info({
      title: 'Settings',
      content: (
        <div>
          <Popconfirm 
            title="This will export a CSV file of your data"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={ onDownloadCsv }
          >
            <Button 
              block
              shape="round" 
              style={{ marginRight: '10px', marginBottom: '5px' }}
              icon={<CloudDownloadOutlined />} 
            >
              Export to .CSV file
            </Button>
          </Popconfirm>
          <div style={{ display: 'flex' }}>
            <Popconfirm 
              title="This will export a JSON file of your data"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={ onDownload }
            >
              <Button 
                block
                size="small"
                shape="round" 
                style={{ marginRight: '10px', marginBottom: '5px' }}
                icon={<CloudDownloadOutlined />} 
              >
                Export list
              </Button>
            </Popconfirm>
            <div>
              <Upload 
                block
                name="players_json"
                accept=".json"
                maxCount={1}
                action={ onUpload }
                beforeUpload={ onBeforeUpload }
                showUploadList={ false }
              >
                <Button 
                  block
                  shape="round" 
                  size="small"
                  icon={<UploadOutlined />}
                >
                  Import list
                </Button>
              </Upload>
            </div>
          </div>
        </div>
      ),
      onOk() {},
    })
  }

  return (
    <div style={{ 
      display: 'flex',
      position: 'fixed',
      bottom: 0,
      backgroundColor: '#242835',
      width: '100%',
      left: 0,
      padding: '11px 15px', 
    }}>
      <div style={{ flexGrow: 3 }}>
        <span style={{ color: '#a0a0a0' }}>© 2021 apple-bit</span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button 
          shape="circle" 
          style={{ marginRight: '10px', marginBottom: '5px' }}
          icon={<SettingOutlined />}
          onClick={ handleSettings } 
        />
      </div>
    </div>
  )
}

export default Footer