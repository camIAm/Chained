import {SET_PAYMENT_REQUEST} from '../../constants'
import {append} from 'ramda'
export const allRequests = (state = [], action) => {

  switch (action.type) {
    case SET_PAYMENT_REQUEST:
      return append(action.payload, state)
    default:
      return state
  }
}