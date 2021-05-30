import React, { useState, useContext, } from 'react'
import { Card, Typography } from 'antd'
import numeral from 'numeral'
import { PlayersContext } from '../contexts/PlayersContext'

const { Paragraph } = Typography

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
      <Card style={{ width: 250 }} title="SLP Rate in Peso">
        <Paragraph editable={{ onChange: updateSlpRatePeso }}>{ numeral(slpRatePeso).format('0,0.00') }</Paragraph>
      </Card>
    </div>
  )
}
export default RatesView