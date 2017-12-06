import {IS_ACTIVE} from '../../constants'

export const isActive = (state = true, action) => {
  switch (action.type) {
    case IS_ACTIVE:
      return action.payload
    default:
      return state
  }
}