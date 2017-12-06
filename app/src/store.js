import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {drawer} from './reducers/drawer'
import {allTransactions} from './reducers/txs/allTransactions'
import {personalTxs} from './reducers/txs/personalTxs'
import {activeUser} from './reducers/users/activeUser'
import {allUsers} from './reducers/users/users'

const store = createStore(combineReducers({drawer, allUsers,activeUser, personalTxs, allTransactions}), applyMiddleware(thunk))

store.subscribe(() => {
  console.log('store.getState()', store.getState())
})

export default store