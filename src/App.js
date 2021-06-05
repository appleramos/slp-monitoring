import './App.css';
import 'antd/dist/antd.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Main from './components/Main'
import { PlayersContextProvider } from './contexts/PlayersContext';


function App() {
  return (
    <Router>
      <PlayersContextProvider>
        <Main />
          <Switch>
						<Route
							exact
							path="/slp-monitoring"
							component={ Main }
						/>
						<Redirect to="/slp-monitoring"/>
					</Switch>
      </PlayersContextProvider>
    </Router>
  )
}

export default App;
