import React, { useContext, } from 'react'
import numeral from 'numeral'

import { Radio, Typography, Skeleton, } from 'antd'

import DataView from './DataView'
import CoingeckoIcon from './coin-gecko.png'
import { SettingsContext } from '../contexts/SettingsContext'

const { Paragraph, Title, } = Typography

const RatesView = () => {
  const {
		slpRatePeso,
    setSlpRatePeso,
    earningsUnit,
    setEarningsUnit,
    totalToggle,
    setTotalToggle,
    slpRateLoading,
	} = useContext(SettingsContext)

  const updateSlpRatePeso = (rateText) => {
    if (rateText !== '') {
      setSlpRatePeso(parseFloat(rateText))
      window.localStorage.setItem('slpRatePeso', parseFloat(rateText))
    }
  }

  const handleEarningsUnitChange = (e) => {
     setEarningsUnit(e.target.value)
  }

  const handleTotalToggleChange = (e) => {
    setTotalToggle(e.target.value)
  }

  const earningsOptions = [
    { label: 'Peso', value: 'peso' },
    { label: 'SLP', value: 'slp' },
  ]

  const totalOptions = [
    { label: 'All', value: 'all' },
    { label: 'Claimable', value: 'claimable' },
  ]

  return (
    <div>
      <div style={{ marginRight: '15px' }}>
        <div style={{ marginRight: '50px', color: 'gray' }}>SLP Rate</div>
        { slpRateLoading ?
          <Skeleton.Input style={{ width: 40 }} active={ true } size="small" />
          :
          <div style={{ display: 'flex' }}>
            <img alt="CoinGecko Icon" src={ CoingeckoIcon } style={{ width: '26px', height: '26px', marginRight: '10px' }}/>
            <h4 style={{ color: 'white' }}>PHP</h4>
            <Title level={4}>
              <Paragraph 
                style={{ color: 'white' }}
                editable={{ onChange: updateSlpRatePeso }}
              >
                { numeral(slpRatePeso).format('0,0.00') }
              </Paragraph>
            </Title>
          </div>
        }
      </div>
      <div style={{ marginBottom: '10px', display: 'flex' }}>
        <DataView 
          style={{ marginRight: '25px' }}
          title="Earnings Unit"
          value={
            <Radio.Group
              options={ earningsOptions }
              onChange={ handleEarningsUnitChange }
              value={ earningsUnit }
              optionType="button"
              buttonStyle="solid"
            />
          }
        />
        <DataView 
          title="Total"
          value={
            <Radio.Group
              options={ totalOptions }
              onChange={ handleTotalToggleChange }
              value={ totalToggle }
              optionType="button"
              buttonStyle="solid"
            />
          }
        />
      </div>
    </div>
  )
}
export default RatesView