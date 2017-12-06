import React, {Component} from 'react';
import {Switch, Router, Route} from 'react-router-dom'
import './App.css';
import history from './history'
import Home from './pages/home'
import Search from './pages/search'
import Profile from './pages/profile2'

const App = props => {

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/search/:id" component={Search}/>
          <Route path="/profile/:id" component={Profile}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
