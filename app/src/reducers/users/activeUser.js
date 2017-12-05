import {ACTIVE_USER} from '../../constants'

export const activeUser = (state = {
  id: "user_rcmontgo",
  firstName: "Cam",
  lastName: "Montgomery",
  userName: "rcmontgo"
}, action) => {
  switch (action.type) {
    case ACTIVE_USER:
      return action.payload
    default:
      return state
  }
}