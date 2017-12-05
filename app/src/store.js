import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {drawer} from './reducers/drawer'
import {allTransactions} from './reducers/txs/allTransactions'
import {personalTxs} from './reducers/txs/personalTxs'
import {activeUser} from './reducers/users/activeUser'

const store = createStore(combineReducers({drawer, activeUser, personalTxs, allTransactions}), applyMiddleware(thunk))

store.subscribe(() => {
  console.log('store.getState()', store.getState())
})

export default store