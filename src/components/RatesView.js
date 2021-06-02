import React, { useContext, useEffect, useState, } from 'react'
import numeral from 'numeral'

import { Radio, Typography, Skeleton, Button, } from 'antd'

import { PlayersContext } from '../contexts/PlayersContext'
import DataView from './DataView'

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
      <div>
        <div style={{ marginRight: '50px', color: 'gray' }}>SLP Rate in Peso</div>
        { slpRateLoading ?
          <Skeleton.Input style={{ width: 40 }} active={ true } size="small" />
          :
          <div>
            <Title level={4}>
              <Paragraph 
                editable={{ onChange: updateSlpRatePeso }}
              >
                { numeral(slpRatePeso).format('0,0.00') }
              </Paragraph>
            </Title>
            {/* <Title level={4}>
              { `PHP ${numeral(slpRatePeso).format('0,0.00')}` }
            </Title> */}
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