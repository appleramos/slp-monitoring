import React, { useEffect, useState, useContext, } from 'react'
import axios from 'axios'
import { Skeleton } from 'antd'

import { PageContext } from '../contexts/PageContext'
import HpIcon from './axie-assets/icon-hp.png'
import MoraleIcon from './axie-assets/icon-morale.png'
import SkillIcon from './axie-assets/icon-skill.png'
import SpeedIcon from './axie-assets/icon-speed.png'
import Stat from './Stat'
import { get } from 'lodash'

const Axie = ({ data }) => {
  const {
    image='',
    id,
    name
  } = data
  const {
    isPlayerDataSidebarVisible,
	} = useContext(PageContext)
  const [ loading, setLoading ] = useState(false)
  const [ axieData, setAxieData ] = useState()

  useEffect(() => {
    if (!!id) {
      if (!axieData && !loading && isPlayerDataSidebarVisible) {
        setLoading(true)
        axios(`https://api.axie.technology/getgenes/${id}/all`)
          .then(res => {
            setLoading(false)
            setAxieData(res.data)
            setLoading(false)
          })
      }
    }
  })

  return (
    <div className="axie-container" key={ id }>
      <div className="axie-info">
        <div>
          <a href={ `https://marketplace.axieinfinity.com/axie/${id}` } target="_blank">#{id}</a>
        </div>
        <div className="font-weight-bold">{name}</div>
        <img src={ image } alt="Axie img" className="axie-img"/>
        <div style={{ textAlign: 'left' }}>
          <div className="font-weight-bold" style={{ paddingBottom: '10px' }}>Stats</div>
          <div style={{ display: 'flex' }}>
            <Stat 
              label="Health"
              value={ get(axieData, 'stats.hp', 0) }
              icon={ HpIcon }
            />
            <Stat 
              label="Speed"
              value={ get(axieData, 'stats.speed', 0) }
              icon={ SpeedIcon }
            />
            <Stat 
              label="Skill"
              value={ get(axieData, 'stats.skill', 0) }
              icon={ SkillIcon }
            />
            <Stat 
              label="Morale"
              value={ get(axieData, 'stats.morale', 0) }
              icon={ MoraleIcon }
            />
          </div>
        </div>
      </div>
      {/* <div>
        { loading && <Skeleton /> }
        { (!loading && axieData) &&
          <div>          
            Test
          </div>
        }
      </div> */}
    </div>
  )
}

export default Axie
