import React, {Component} from 'react';
import {Switch, Router, Route} from 'react-router-dom'
import './App.css';
import history from './history'
import Home from './pages/home'
import Search from './pages/search'
import Profile from './pages/profile2'
import SendForm from './components/sendForm'
import ReceiptTicket from './components/receipt-ticket'
import ScrollToTop from './ScrollToTop'
import Auth from './auth'
import Callback from './pages/callback'
const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  console.log("handleAuthentication")
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}
const App = props => {

  return (
    <Router history={history}>
      <ScrollToTop>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              auth={auth}
              render={props =>< Home auth = {
              auth
            }
            {
              ...props
            } />}/>
            <Route exact path="/profile/:id/:tx" component={ReceiptTicket}/>
            <Route exact path="/search/:id" component={Search}/>
            <Route exact path="/search/send/:id" component={SendForm}/>
            <Route path="/profile/:id" component={Profile}/>
            <Route
              exact
              path="/callback"
              render={props => {
              console.log("props in /callback: ", props);
              handleAuthentication(props);
              return <Callback {...props}/>
            }}/>
          </Switch>
        </div>
      </ScrollToTop>
    </Router>
  )
}

export default App