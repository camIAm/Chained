import {BANK_DEPOSIT} from '../constants'
import {merge} from 'ramda'

export const bankDeposit = (state = {amount:0,sent: false}, action) => {
  switch (action.type) {
    case BANK_DEPOSIT:
      return merge(state,{amount:action.payload})
    default:
      return state
  }
}