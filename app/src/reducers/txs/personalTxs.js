import {PERSONAL_TXS} from '../../constants'

export const personalTxs = (state = [], action) => {
  switch (action.type) {
    case PERSONAL_TXS:
      return action.payload
    default:
      return state
  }
}