import React, {
	createContext,
	useState,
} from 'react'

export const PageContext = createContext()

export const  PageContextProvider = (props) => {
  const [ isPlayerDataSidebarVisible, setPlayerDataSidebarVisibility ] = useState(false)
  
	return(
		<PageContext.Provider
			value={{
				isPlayerDataSidebarVisible,
				setPlayerDataSidebarVisibility,
			}}
		>
			{props.children}
		</PageContext.Provider>
	)
}
