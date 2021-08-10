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
	const [ selectedPlayerData, setSelectedPlayerData ] = useState({})
  
	return(
		<PlayersContext.Provider
			value={{
				players,
        setPlayers,
        playersData,
        setPlayersData,
				selectedPlayer,
				setSelectedPlayer,
				selectedPlayerData,
				setSelectedPlayerData,
			}}
		>
			{props.children}
		</PlayersContext.Provider>
	)
}
