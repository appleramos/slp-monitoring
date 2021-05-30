import React, { useState, useContext, } from 'react'
import { Card, Typography } from 'antd'
import numeral from 'numeral'
import { PlayersContext } from '../contexts/PlayersContext'

const { Paragraph, Title, } = Typography

const RatesView = () => {
  const {
		slpRatePeso,
    setSlpRatePeso,
	} = useContext(PlayersContext)

  const updateSlpRatePeso = (rateText) => {
    if (rateText !== '') {
      setSlpRatePeso(parseFloat(rateText))
      window.localStorage.setItem('slpRatePeso', parseInt(rateText))
    }
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      <div>
        <div style={{ marginRight: '30px', color: 'gray' }}>SLP Rate in Peso</div>
        <Title level={4}>
          <Paragraph 
            editable={{ onChange: updateSlpRatePeso }}
          >
            { numeral(slpRatePeso).format('0,0.00') }
          </Paragraph>
        </Title>
      </div>
    </div>
  )
}
export default RatesView