import React, { useContext, } from 'react'
import numeral from 'numeral'

import { Radio, Typography, Skeleton, } from 'antd'

import { PlayersContext } from '../contexts/PlayersContext'
import DataView from './DataView'
import SlpIcon from './slp-icon.png'
import CoingeckoIcon from './coin-gecko.png'

const { Paragraph, Title, } = Typography

const RatesView = () => {
  const {
		slpRatePeso,
    setSlpRatePeso,
    earningsUnit,
    setEarningsUnit,
    slpRateLoading,
	} = useContext(PlayersContext)

  const updateSlpRatePeso = (rateText) => {
    if (rateText !== '') {
      setSlpRatePeso(parseFloat(rateText))
      window.localStorage.setItem('slpRatePeso', parseFloat(rateText))
    }
  }

  const handleEarningsUnitChange = (e) => {
     setEarningsUnit(e.target.value)
  }

  const earningsOptions = [
    { label: 'Peso', value: 'peso' },
    { label: 'SLP', value: 'slp' },
  ]

  return (
    <div style={{ marginBottom: '10px', display: 'flex' }}>
      <div style={{ marginRight: '15px' }}>
        <div style={{ marginRight: '50px', color: 'gray' }}>SLP Rate</div>
        { slpRateLoading ?
          <Skeleton.Input style={{ width: 40 }} active={ true } size="small" />
          :
          <div style={{ display: 'flex' }}>
            <img alt="CoinGecko Icon" src={ CoingeckoIcon } style={{ width: '26px', height: '26px', marginRight: '10px' }}/>
            <h4>PHP</h4>
            <Title level={4}>
              <Paragraph 
                editable={{ onChange: updateSlpRatePeso }}
              >
                { numeral(slpRatePeso).format('0,0.00') }
              </Paragraph>
            </Title>
          </div>
        }
      </div>
      <div>
        <DataView 
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
      </div>
    </div>
  )
}
export default RatesView