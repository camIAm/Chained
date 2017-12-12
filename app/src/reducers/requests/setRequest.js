import {SET_PAYMENT_REQUEST} from '../../constants'

export const allRequests = (state = [], action) => {

  switch (action.type) {
    case SET_PAYMENT_REQUEST:
      return action.payload
    default:
      return state
  }
}