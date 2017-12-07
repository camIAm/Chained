import {DATA_LOADED} from '../constants'

export const load = (state = {
  loaded: false
}, action) => {
  switch (action.type) {
    case DATA_LOADED:
      return {loaded: action.payload}
    default:
      return state
  }
}