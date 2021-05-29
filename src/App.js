import './App.css';
import 'antd/dist/antd.css'
import React from 'react'
import Main from './components/Main'
import { PlayersContextProvider } from './contexts/PlayersContext';


function App() {
  return (
    <PlayersContextProvider>
      <Main />
    </PlayersContextProvider>
  )
}

export default App;
