import React, {
	createContext,
	useState,
} from 'react'

export const AxieContext = createContext()

export const  AxieContextProvider = (props) => {
	const [ showCards, setShowCards ] = useState(false)
  const [ axieCards, setAxieCards ] = useState()
  
	return(
		<AxieContext.Provider
			value={{
				showCards,
				setShowCards,
        axieCards,
        setAxieCards,
			}}
		>
			{props.children}
		</AxieContext.Provider>
	)
}
