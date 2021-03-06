import React, { useState, useEffect, useContext, } from 'react'
import { cloneDeep, filter, findIndex, get, } from 'lodash'
import axios from 'axios'
import moment from 'moment'
import numeral from 'numeral'
import ObjectsToCsv from 'node-create-csv'

import { message, Upload, } from 'antd'

import { PlayersContext } from '../contexts/PlayersContext'
import { SettingsContext } from '../contexts/SettingsContext'
import UserInput from './UserInput'
import Footer from './Footer'
import Header from './Header'
import TrackerTable from './TrackerTable'
import EarningsView from './EarningsView'
import PlayerDataSidebar from './PlayerDataSidebar'

function Main() {
  const {
		players,
    setPlayers,
    playersData,
    setPlayersData,
    selectedPlayer,
    setSelectedPlayer,
	} = useContext(PlayersContext)
  const {
    setSlpRatePeso,
    slpRatePeso,
    setSlpRateLoading,
	} = useContext(SettingsContext)
  const slpRatePesoStorage = window.localStorage.getItem('slpRatePeso') || 1
  const [ tableLoading, setTableLoading ] = useState(true)
  const [ isFormVisible, setIsFormVisible ] = useState(false)

  useEffect(() => {
    loadPlayerData()
    loadSlpRate()
  }, [])

  const loadSlpRate = () => {
    setSlpRateLoading(true)
    async function fetchData() {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=php')
        if (res.data) {
          const coingeckoValue = get(res.data, 'smooth-love-potion.php', slpRatePeso)
          setSlpRatePeso(coingeckoValue)
        }
        setSlpRateLoading(false)
      } catch (err) {
        setSlpRatePeso(slpRatePesoStorage)
        setSlpRateLoading(false)
      }
    }
    fetchData()
  }

  const loadPlayerData = (plyrs) => {
    let newPlayersData = []
    let myPlayers = plyrs || players

    async function fetchData(player, retry) {
      let retryCount = retry !== undefined ? retry : 0
      try {
        const res = await axios(`https://game-api.skymavis.com/game-api/clients/${player.address}/items/1`)
        if (res.data) {
          const {
            client_id,
            total,
            claimable_total,
            last_claimed_item_at,
          } = res.data
          const locked = total - claimable_total
          const isClaimable = last_claimed_item_at === 0 ? false : moment().isSameOrAfter(getNextClaimDate(last_claimed_item_at))
          newPlayersData.push({
            id: client_id,
            nickname: player.name,
            accountName: player.account_name,
            total: total || 0,
            claimable: claimable_total || 0,
            lockedSlp: locked,
            lastClaimedAt: getLastClaimDate(last_claimed_item_at),
            dailyAvg: getDailyAvg(last_claimed_item_at, locked),
            nextClaimDate: getNextClaimDate(last_claimed_item_at),
            isClaimable,
          })
        }
      } catch (err) {
        if (retryCount !== 16) {
          retryCount += 1
          fetchData(player, retryCount)
        } else {
          newPlayersData.push({
            id: `invalid-user-${player.address}`,
            nickname: player.name,
            accountName: player.account_name,
            total: 0,
            claimable: 0,
            lockedSlp: 0,
            lastClaimedAt: moment(),
            dailyAvg: 0,
            nextClaimDate: moment(),
            isClaimable: false,
          })
        }
      }
      setPlayersData(newPlayersData)
      if (newPlayersData.length === myPlayers.value.length) {
        setTableLoading(false)
      }
    }

    if (myPlayers.value.length < 1) {
      setTableLoading(false)
      return
    }
    myPlayers.value.forEach((player) => {
      fetchData(player)
    })
  }

  const getDailyAvg = (lastClaimedAt, total) => {
    const lastClaimDate = moment(new Date(lastClaimedAt * 1000))
    const dateNow = moment()
    const dateDiff = dateNow.diff(lastClaimDate, 'days')
    if (dateDiff < 1) {
      return total
    }

    return numeral(total/dateDiff).format('0,0.00')
  }

  const getNextClaimDate = (lastClaimedAt) => {
    if (lastClaimedAt === 0) {
      return 0
    }
    const lastClaimDate = moment(new Date(lastClaimedAt * 1000))
    return lastClaimDate.add(14, 'days')
  }

  const getLastClaimDate = (date) => {
    if (date === 0) {
      return 0
    }
    return moment(new Date(date * 1000))
  }

  const handleDeletePlayer = (player) => {
    const newPlayers = filter(players.value, (p) => p.key !== player.key) 
    const newPlayersData = filter(playersData, p => p.id !== player.address)
    setPlayers({value: newPlayers})
    setPlayersData(newPlayersData)
    window.localStorage.setItem('players', JSON.stringify({value: newPlayers}))
    message.success(`Successfully deleted ${player.name}`)
  }

  const handleEditPlayer = (player) => {
    setIsFormVisible(true)
    setSelectedPlayer(player)
  }

  const handleSubmit = (player) => {
    setTableLoading(true)
    const newPlayersData = cloneDeep(playersData)
    const newPlayers = cloneDeep(players)
    player.address = player.address.replace('ronin:', '0x')

    axios(`https://game-api.skymavis.com/game-api/clients/${player.address}/items/1`)
      .then(res => {
        if (res.data) {
          const {
            client_id,
            total,
            claimable_total,
            last_claimed_item_at,
          } = res.data
          const locked = total - claimable_total
          const isClaimable = last_claimed_item_at === 0 ? false : moment().isSameOrAfter(getNextClaimDate(last_claimed_item_at))
          const playerData = {
            id: client_id,
            nickname: player.name,
            accountName: player.account_name,
            total: total || 0,
            claimable: claimable_total || 0,
            lockedSlp: locked,
            lastClaimedAt: getLastClaimDate(last_claimed_item_at),
            dailyAvg: getDailyAvg(last_claimed_item_at, locked),
            nextClaimDate: getNextClaimDate(last_claimed_item_at),
            isClaimable,
          }

          if (selectedPlayer.name) {
            let pdIndex = findIndex(newPlayersData, player => {
              return player.id.toLowerCase() === selectedPlayer.address.toLowerCase()
            })
            let pIndex = findIndex(newPlayers.value, player => {
              return player.address.toLowerCase() === selectedPlayer.address.toLowerCase()
            })
            if (pdIndex !== -1 && pIndex !== -1) {
              newPlayersData.splice(pdIndex, 1, playerData)
              newPlayers.value.splice(pIndex, 1, player)
            }
          } else {
            newPlayersData.push(playerData)
            newPlayers.value.push(player)
          }
        }
        setTableLoading(false)
        setPlayersData(newPlayersData)
        window.localStorage.setItem('players', JSON.stringify(newPlayers))
        setPlayers(newPlayers)
      })
      .catch(err => {
        message.error('You entered an invalid ronin address')
        setTableLoading(false)
      })
      setIsFormVisible(false)
  }

  const handleOpenForm = () => {
    setIsFormVisible(true)
    setSelectedPlayer({})
  }

  const handleCancelForm = () => {
    setIsFormVisible(false)
  }

  const handleReload = () => {
    const newPlayersData = []
    setTableLoading(true)
    setPlayersData(newPlayersData)
    loadPlayerData()
    loadSlpRate()
  }

  const handleDownload = () => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(players))
    var downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href",     dataStr)
    downloadAnchorNode.setAttribute("download", `monitoring_players_${Date.now()}.json`)
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleUpload = (file) => {
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      const playersFromFile = JSON.parse(reader.result)
      setPlayers(playersFromFile)
      window.localStorage.setItem('players', JSON.stringify(playersFromFile))
      setTableLoading(true)
      loadPlayerData(playersFromFile)
    }
  }

  const handleDownloadToCsv = () => {
    (async () => {
      const csv = new ObjectsToCsv(playersData)
      const csvString = await csv.toString()
      const encodedUri = encodeURI(`data:text/csv;charset=utf-8, + ${csvString}`)
      var link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `monitoring_players_${Date.now()}.csv`)
      document.body.appendChild(link)
      
      link.click()
      link.remove()
    })()
  }

  const handleBeforeUpload = (file) => {
    if (file.type !== 'application/json') {
      message.error(`${file.name} is not a JSON file`);
    }
    return file.type === 'application/json' ? true : Upload.LIST_IGNORE;
  }

  return (
    <div 
      className="SLP_Monitoring_App"
      style={{
        padding: '15px 25px',
        margin: 'auto',
      }}
    >
      <Header 
        onOpenForm={ handleOpenForm }
        onReload={ handleReload }
      />
      <EarningsView />
      <TrackerTable 
        loading={ tableLoading }
        onDelete={ handleDeletePlayer }
        onEdit={ handleEditPlayer }
      />
      { isFormVisible &&
        <UserInput 
          onSubmit={ handleSubmit } 
          visible={ true }
          onCancel={ handleCancelForm }
          selectedPlayer={ selectedPlayer }
        />
      }
      <PlayerDataSidebar />
      <Footer 
        onBeforeUpload={ handleBeforeUpload }
        onUpload={ handleUpload }
        onDownload={ handleDownload }
        onDownloadCsv={ handleDownloadToCsv }
      />
    </div>
  )
}

export default Main;
