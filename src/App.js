import './App.scss';
import 'antd/dist/antd.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Main from './components/Main'
import { PlayersContextProvider } from './contexts/PlayersContext'
import { SettingsContextProvider } from './contexts/SettingsContext'
import { PageContextProvider } from './contexts/PageContext'
import { AxieContextProvider } from './contexts/AxieContext'

function App() {
  return (
    <Router>
      <PageContextProvider>
        <SettingsContextProvider>
          <PlayersContextProvider>
            <AxieContextProvider>
            <Switch>
              <Route
                exact
                path="/monitoring"
                component={ Main }
              />
              <Redirect to="/monitoring"/>
            </Switch>
            </AxieContextProvider>
          </PlayersContextProvider>
        </SettingsContextProvider>
      </PageContextProvider>
    </Router>
  )
}

export default App;
