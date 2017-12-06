import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {drawer} from './reducers/drawer'
import {allTransactions} from './reducers/txs/allTransactions'
import {personalTxs} from './reducers/txs/personalTxs'
import {activeUser} from './reducers/users/activeUser'
import {allUsers} from './reducers/users/users'
import {transactionForm} from './reducers/txs/searchTxs'
import {isActive} from './reducers/txs/isActive'
const store = createStore(combineReducers({drawer, allUsers,isActive,transactionForm,activeUser, personalTxs, allTransactions}), applyMiddleware(thunk))

store.subscribe(() => {
  console.log('store.getState()', store.getState())
})

export default store