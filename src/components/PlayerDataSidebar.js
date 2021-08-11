import React, { useContext, useEffect, useState, } from 'react'
import { Drawer, Spin, Skeleton, Typography, } from 'antd'
import { AreaChartOutlined, RiseOutlined, } from '@ant-design/icons'
import numeral from 'numeral'
import axios from 'axios'
import { get } from 'lodash'
import moment from 'moment'

import { PageContext } from '../contexts/PageContext'
import { PlayersContext } from '../contexts/PlayersContext'
import SlpIcon from './slp-icon.png'
import PlayerData from './PlayerData'
import Axie from './Axie'
import AxieCardsDrawer from './AxieCardsDrawer'

const { Paragraph } = Typography

const PlayerDataSidebar = () => {
  const {
    isPlayerDataSidebarVisible,
    setPlayerDataSidebarVisibility,
	} = useContext(PageContext)
  const [ loading, setLoading ] = useState(false)
  const [ axiesLoading, setAxiesLoading ] = useState(false)

  const [ playerGameData, setPlayerGameData ] = useState()
  const [ playerAxies, setPlayerAxies ] = useState()
  const { selectedPlayerData, } = useContext(PlayersContext)
  const {
    id,
    nickname,
    total,
  } = selectedPlayerData

  useEffect(() => {
    getPlayerAxies()
    if (!!id) {
      if (!playerGameData && !loading && isPlayerDataSidebarVisible) {
        setLoading(true)
        axios(`https://api.lunaciarover.com/stats/${id}`)
          .then(res => {
            setLoading(false)
            setPlayerGameData(res.data)
          })
      }
    }
  })

  const getPlayerAxies = () => {
    if (!axiesLoading && isPlayerDataSidebarVisible && !playerAxies) {
      setAxiesLoading(true)
      axios.post('https://axieinfinity.com/graphql-server-v2/graphql', 
        {
          operationName: 'GetAxieBriefList',
          query: "query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n    total\n    results {\n      ...AxieBrief\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieBrief on Axie {\n  id\n  name\n  stage\n  class\n  breedCount\n  image\n  title\n  battleInfo {\n    banned\n    __typename\n  }\n  auction {\n    currentPrice\n    currentPriceUSD\n    __typename\n  }\n  parts {\n    id\n    name\n    class\n    type\n    specialGenes\n    __typename\n  }\n  __typename\n}\n",
          variables: {
            owner: id,
            from: 0,
            size: 24
          }
        }
      ).then(res => {
        const axies = get(res.data, 'data.axies.results', [])
        setPlayerAxies(axies)
        setAxiesLoading(false)
      })
    }
  }
  const renderAddress = () => {
    if (id) {
      const address = id.replace('0x', 'ronin:')
      const firstDigits = address.substring(0, 11)
      const lastDigits = address.substring(address.length - 8, address.length)

      return (
        <Paragraph 
          copyable={{ text: address.toLowerCase() }}
          style={{ color: '#a0a0a0' }}
        >
          { `${firstDigits}...${lastDigits}` }
        </Paragraph>
      )
    }
    return null
  }

  const handleClose = () => {
    setPlayerDataSidebarVisibility(false)
    setPlayerGameData()
    setPlayerAxies()
  }

  const getLastUpdate = () => {
    const lastUpdateTS = get(playerGameData, 'updated_on')
    const formatedDate = moment(new Date(lastUpdateTS * 1000)).format('MMM DD, hh:mm a')
    return formatedDate
  }

  return (
    <Drawer
      title={ 
        <div>
          { nickname }
          { renderAddress() }
        </div> 
      }
      height="560px"
      onClose={ handleClose }
      visible={ isPlayerDataSidebarVisible }
      placement="bottom"
    >
      { loading ?
        <Spin/>
        :
        <div>
          <div style={{ marginBottom: '20px' }}>
            <div className="m-lbl font-weight-bold">{ get(playerGameData, 'ign', '' ) }</div>
            <div style={{ color: 'gainsboro' }}>Last update: &nbsp;{ getLastUpdate() }</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <PlayerData 
              value={ numeral(total).format('0,0') } 
              img={ SlpIcon }
            />
            <PlayerData
              icon={ <AreaChartOutlined /> }
              value={ numeral(get(playerGameData, 'mmr', 0)).format('0,0') }
              label="MMR"
            />
            <PlayerData
              icon={ <RiseOutlined /> }
              value={ numeral(get(playerGameData, 'rank', 0)).format('0,0') }
              label="Rank"
            />
          </div>
          { (axiesLoading && !playerAxies) &&
            <Skeleton />
          }
          { (playerAxies && !axiesLoading) &&
            <div>
              <div 
                className="font-weight-bold m-lbl" 
                style={{ marginBottom: '10px', marginTop: '20px' }}
              >
                <span>Axies</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                { playerAxies.map(axie => <Axie data={axie} breedCount={ get(axie, 'breedCount', 0) }/>) }
              </div>
            </div>
          }
        </div>
      }
      <AxieCardsDrawer />
    </Drawer>
  )
}

export default PlayerDataSidebar