import {PERSONAL_REQUESTS} from '../../constants'

export const personalRequests = (state = [], action) => {
    switch (action.type) {
      case PERSONAL_REQUESTS:
        return action.payload
      default:
        return state
    }
  }