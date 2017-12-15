import {ACTIVE_USER} from '../../constants'
import {BANK_DEPOSIT,SET_NON_ACTIVE_USERS} from '../../constants'
import {merge} from 'ramda'

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
    case BANK_DEPOSIT:
      return merge(state,{balance:0})
    default:
      return state
  }
}

export const nonActiveUsers = (state = {
  _id: "",
  firstName: "",
  lastName: "",
  userName: "",
  balance:"50.00"
}, action) => {
  switch (action.type) {
    case SET_NON_ACTIVE_USERS:
      return action.payload
    default:
      return state
  }
}
