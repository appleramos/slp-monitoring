import React, { Fragment, useContext } from 'react'
import { Drawer } from 'antd'
import { filter, get, } from 'lodash'

import { AxieContext } from '../contexts/AxieContext'
import AttkIcon from './axie-assets/icon-atk.png'
import DefIcon from './axie-assets/icon-def.png'
import BgAqua from './axie-assets/bg-aqua.png'
import BgBeast from './axie-assets/bg-beast.png'
import BgBird from './axie-assets/bg-bird.png'
import BgBug from './axie-assets/bg-bug.png'
import BgPlant from './axie-assets/bg-plant.png'
import BgReptile from './axie-assets/bg-reptile.png'

const BG_CLASS = {
  'Aquatic': BgAqua,
  'Beast': BgBeast,
  'Bird': BgBird,
  'Bug': BgBug,
  'Plant': BgPlant,
  'Reptile': BgReptile,
}

const AxieCardsDrawer = () => {
  const { 
    showCards, 
    setShowCards,
    axieCards,
    setAxieCards,
  } = useContext(AxieContext)

  const handleClose = () => {
    setShowCards(false)
    console.log(axieCards)
  }

  const backCard = filter(axieCards, { type: 'Back' })[0]
  const mouthCard = filter(axieCards, { type: 'Mouth' })[0]
  const hornCard = filter(axieCards, { type: 'Horn' })[0]
  const tailCard = filter(axieCards, { type: 'Tail' })[0]

  const cards = [backCard, mouthCard, hornCard, tailCard]

  const getBgFromClass = (clazz) => {
    return BG_CLASS[clazz]
  }

  return (
    <Drawer
      title="Cards"
      visible={ showCards }
      onClose={ handleClose }
      placement="bottom"
      height="560px"
    >
      <div className="cards-container">
      {
        cards.map(card => (
          <div>
            <div className="stat-label" style={{ textAlign: 'center', marginLeft: '-16px', marginBottom: '10px' }}>
              { get(card, 'name') }
            </div>
            <div className="axie-card relative">
              <img 
                className="w-full" 
                src={ get(card, 'abilities.0.backgroundUrl') } 
                alt={ get(card, 'id') }
              />
              <div className="effect-container absolute flex justify-center items-center">
                <img className="w-1/2" src={ get(card, 'abilities.0.effectIconUrl') } alt="effect-icon"/>
              </div>
              <div class="card-name absolute flex justify-center items-center font-black">{ get(card, 'abilities.0.name') }</div>
              <div className="absolute w-1/5 attack-container">
                <div className="w-full">
                  <img className="w-full" src={ getBgFromClass(get(card, 'class')) } alt="bg"/>
                  <div className="absolute w-2/3 attack-icon-container">
                    <img className="w-full" src={ AttkIcon } alt="bg"/>
                  </div>
                  <div 
                    className="attack-value absolute w-full overflow-hidden text-center font-black" 
                  >
                    75
                  </div>
                </div>
              </div>
              <div className="absolute w-1/5 def-container">
                <div className="w-full">
                  <img className="w-full" src={ getBgFromClass(get(card, 'class')) } alt="bg"/>
                  <div className="absolute w-2/3 def-icon-container">
                    <img className="w-full" src={ DefIcon } alt="bg"/>
                  </div>
                  <div 
                    className="def-value absolute w-full overflow-hidden text-center font-black" 
                  >
                    75
                  </div>
                </div>
              </div>
              <div className="energy-label absolute flex justify-center items-center font-black">
                { get(card, 'abilities.0.energy') } 
              </div>
              <div className="card-description absolute flex justify-center items-center font-semibold">
                { get(card, 'abilities.0.description') }
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </Drawer>
  )
}

export default AxieCardsDrawer
