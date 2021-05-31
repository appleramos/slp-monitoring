import React, { useContext, } from 'react'
import { Radio, Typography } from 'antd'
import numeral from 'numeral'
import { PlayersContext } from '../contexts/PlayersContext'
import DataView from './DataView'

const { Paragraph, Title, } = Typography

const RatesView = () => {
  const {
		slpRatePeso,
    setSlpRatePeso,
    earningsUnit,
    setEarningsUnit,
	} = useContext(PlayersContext)

  const updateSlpRatePeso = (rateText) => {
    if (rateText !== '') {
      setSlpRatePeso(parseFloat(rateText))
      window.localStorage.setItem('slpRatePeso', parseInt(rateText))
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
        <div style={{ marginRight: '30px', color: 'gray' }}>SLP Rate in Peso</div>
        <Title level={4}>
          <Paragraph 
            editable={{ onChange: updateSlpRatePeso }}
          >
            { numeral(slpRatePeso).format('0,0.00') }
          </Paragraph>
        </Title>
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