import './App.scss';
import 'antd/dist/antd.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Main from './components/Main'
import { PlayersContextProvider } from './contexts/PlayersContext';


function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App;
