import React, {
	createContext,
	useState,
} from 'react'

export const SettingsContext = createContext()

export const  SettingsContextProvider = (props) => {
  const [ slpRatePeso, setSlpRatePeso ] = useState()
  const [ earningsUnit, setEarningsUnit ] = useState('peso')
	const [ totalToggle, setTotalToggle ] = useState('all')
	const [ slpRateLoading, setSlpRateLoading ] = useState(false)
  
	return(
		<SettingsContext.Provider
			value={{
				slpRatePeso,
				setSlpRatePeso,
				earningsUnit,
				setEarningsUnit,
				slpRateLoading,
				totalToggle,
				setTotalToggle,
				setSlpRateLoading,
			}}
		>
			{props.children}
		</SettingsContext.Provider>
	)
}
