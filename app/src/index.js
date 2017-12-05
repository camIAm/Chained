import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import {setAllTransactions, setPersonalTransactions} from './action-creators/txs'

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();

store.dispatch(setAllTransactions)
store.dispatch(setPersonalTransactions)