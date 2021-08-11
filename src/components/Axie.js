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
          <div className="stat-label">Breed Count</div>
          <div>{ `${get(axieData, 'breedCount', 0)} / 7` }</div>
        </div>
        <div style={{ textAlign: 'left', marginTop: '15px' }}>
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
      <div>
        { loading && <Skeleton /> }
        { (!loading && axieData) &&
          <div className="genes-container">          
            <div className="col">
              <div className="stat-label">D</div>
              <div className={ `${get(axieData, 'traits.eyes.d.class')} label`}>
                { get(axieData, 'traits.eyes.d.name') }
              </div>
              <div className={ `${get(axieData, 'traits.ears.d.class')} label`}>
                { get(axieData, 'traits.ears.d.name') }
              </div>
              <div className={ `${get(axieData, 'traits.mouth.d.class')} label`}>
                { get(axieData, 'traits.mouth.d.name') }
              </div>
              <div className={ `${get(axieData, 'traits.horn.d.class')} label`}>
                { get(axieData, 'traits.horn.d.name') }
              </div>
              <div className={ `${get(axieData, 'traits.back.d.class')} label`}>
                { get(axieData, 'traits.back.d.name') }
              </div>
              <div className={ `${get(axieData, 'traits.tail.d.class')} label`}>
                { get(axieData, 'traits.tail.d.name') }
              </div>
            </div>
            <div className="col">
              <div className="stat-label">R1</div>
              <div className={ `${get(axieData, 'traits.eyes.r1.class')} label`}>
                { get(axieData, 'traits.eyes.r1.name') }
              </div>
              <div className={ `${get(axieData, 'traits.ears.r1.class')} label`}>
                { get(axieData, 'traits.ears.r1.name') }
              </div>
              <div className={ `${get(axieData, 'traits.mouth.r1.class')} label`}>
                { get(axieData, 'traits.mouth.r1.name') }
              </div>
              <div className={ `${get(axieData, 'traits.horn.r1.class')} label`}>
                { get(axieData, 'traits.horn.r1.name') }
              </div>
              <div className={ `${get(axieData, 'traits.back.r1.class')} label`}>
                { get(axieData, 'traits.back.r1.name') }
              </div>
              <div className={ `${get(axieData, 'traits.tail.r1.class')} label`}>
                { get(axieData, 'traits.tail.r1.name') }
              </div>
            </div>
            <div className="col">
              <div className="stat-label">R2</div>
              <div className={ `${get(axieData, 'traits.eyes.r2.class')} label`}>
                { get(axieData, 'traits.eyes.r2.name') }
              </div>
              <div className={ `${get(axieData, 'traits.ears.r2.class')} label`}>
                { get(axieData, 'traits.ears.r2.name') }
              </div>
              <div className={ `${get(axieData, 'traits.mouth.r2.class')} label`}>
                { get(axieData, 'traits.mouth.r2.name') }
              </div>
              <div className={ `${get(axieData, 'traits.horn.r2.class')} label`}>
                { get(axieData, 'traits.horn.r2.name') }
              </div>
              <div className={ `${get(axieData, 'traits.back.r2.class')} label`}>
                { get(axieData, 'traits.back.r2.name') }
              </div>
              <div className={ `${get(axieData, 'traits.tail.r2.class')} label`}>
                { get(axieData, 'traits.tail.r2.name') }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Axie
