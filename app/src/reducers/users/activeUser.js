import {ACTIVE_USER} from '../../constants'

export const activeUser = (state = {
  id: "user_rcmontgo",
  firstName: "Cam",
  lastName: "Montgomery",
  userName: "rcmontgo",
  balance:"50.00"
}, action) => {
  switch (action.type) {
    case ACTIVE_USER:
      return action.payload
    default:
      return state
  }
}