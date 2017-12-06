import {SET_ALL_USERS} from '../../constants'

export const allUsers = (state=[],action)=>{
  switch(action.type){
    case SET_ALL_USERS:
    console.log("inside allUsers Red:",action.payload)
      return action.payload
    default:
      return state
  }
}