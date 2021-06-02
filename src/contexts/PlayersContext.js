import React, {
	createContext,
	useState,
} from 'react'

export const PlayersContext = createContext()

export const  PlayersContextProvider = (props) => {
  const storagePlayers = JSON.parse(window.localStorage.getItem('players')) || { value: [] }
  const [ players, setPlayers ] = useState(storagePlayers)
  const [ playersData, setPlayersData ] = useState([])
	const [ selectedPlayer, setSelectedPlayer ] = useState({})
  const [ slpRatePeso, setSlpRatePeso ] = useState()
  const [ earningsUnit, setEarningsUnit ] = useState('peso')
	const [ slpRateLoading, setSlpRateLoading ] = useState(false)
  
	return(
		<PlayersContext.Provider
			value={{
				players,
        setPlayers,
        playersData,
        setPlayersData,
				selectedPlayer,
				setSelectedPlayer,
				slpRatePeso,
				setSlpRatePeso,
				earningsUnit,
				setEarningsUnit,
				slpRateLoading,
				setSlpRateLoading,
			}}
		>
			{props.children}
		</PlayersContext.Provider>
	)
}
