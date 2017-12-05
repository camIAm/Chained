import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {drawer} from './reducers/drawer'
import {allTransactions} from './reducers/txs/allTransactions'
import {personalTxs} from './reducers/txs/personalTxs'

const store = createStore(combineReducers({drawer, personalTxs, allTransactions}), applyMiddleware(thunk))

store.subscribe(() => {
  console.log('store.getState()', store.getState())
})

export default store