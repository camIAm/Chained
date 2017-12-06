import {SET_ALL_TRANSACTIONS} from '../../constants'

export const allTransactions = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_TRANSACTIONS:
      return action.payload
    default:
      return state
  }
}