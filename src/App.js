import './App.scss';
import 'antd/dist/antd.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Main from './components/Main'
import { PlayersContextProvider } from './contexts/PlayersContext'
import { SettingsContextProvider } from './contexts/SettingsContext'

function App() {
  return (
    <Router>
      <SettingsContextProvider>
        <PlayersContextProvider>
          <Switch>
            <Route
              exact
              path="/monitoring"
              component={ Main }
            />
            <Redirect to="/monitoring"/>
          </Switch>
        </PlayersContextProvider>
      </SettingsContextProvider>
    </Router>
  )
}

export default App;
