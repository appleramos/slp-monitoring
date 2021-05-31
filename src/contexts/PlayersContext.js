import React, {
	createContext,
	useState,
} from 'react'

export const PlayersContext = createContext()

export const  PlayersContextProvider = (props) => {
  const storagePlayers = JSON.parse(window.localStorage.getItem('players')) || { value: [] }
	const slpRatePesoStorage = window.localStorage.getItem('slpRatePeso') || 1
  const [ players, setPlayers ] = useState(storagePlayers)
  const [ playersData, setPlayersData ] = useState([])
	const [ selectedPlayer, setSelectedPlayer ] = useState({})
  const [ slpRatePeso, setSlpRatePeso ] = useState(slpRatePesoStorage)
  const [ earningsUnit, setEarningsUnit ] = useState('peso')
  
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
			}}
		>
			{props.children}
		</PlayersContext.Provider>
	)
}
