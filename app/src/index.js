import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import {setAllTransactions} from './action-creators/txs'
import {setAllUsers} from './action-creators/user'
import {setAllRequests} from './action-creators/request'

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();

store.dispatch(setAllTransactions)
store.dispatch(setAllUsers)
store.dispatch(setAllRequests)