import React, {Component} from 'react';
import {Switch, Router, Route} from 'react-router-dom'
import './App.css';
import history from './history'
import Home from './pages/home'
import Search from './pages/search'

const App = props => {

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/search" component={Search}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
