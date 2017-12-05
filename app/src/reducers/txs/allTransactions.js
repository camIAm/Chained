import {ALL_TRANSACTIONS} from '../../constants'

export const allTransactions = (state = [], action) => {
  switch (action.type) {
    case ALL_TRANSACTIONS:
      return action.payload
    default:
      return state
  }
}