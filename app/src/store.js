import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {drawer} from './reducers/drawer'
import {allTransactions} from './reducers/txs/allTransactions'
import {personalTxs} from './reducers/txs/personalTxs'
import {activeUser} from './reducers/users/activeUser'
import {allUsers} from './reducers/users/users'
import {transactionForm} from './reducers/txs/searchTxs'
import {isActive} from './reducers/txs/isActive'
import {singleTransaction} from './reducers/txs/singleTx'
import {load} from './reducers/loaded'

const store = createStore(combineReducers({
  drawer,
  singleTransaction,
  allUsers,
  isActive,
  transactionForm,
  activeUser,
  personalTxs,
  load,
  allTransactions
}), applyMiddleware(thunk))

store.subscribe(() => {
  console.log('store.getState()', store.getState())
})

export default store