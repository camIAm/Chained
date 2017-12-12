import {UPDATE_NEW_TXS_FORM, CLEAR_SEND_FORM} from '../../constants'
import {merge} from 'ramda'

// recipient needs to be changed to 'selected' since the sendForm now requests &
// sends
const setDefaultTxsForm = {
  recipient: '',
  amount: '',
  description: ''
}
export const transactionForm = (state = setDefaultTxsForm, action) => {
  switch (action.type) {
    case UPDATE_NEW_TXS_FORM:
      console.log("UPDATE_NEW_TXS_FORM action:", action);
      return merge(state, action.payload)
    case CLEAR_SEND_FORM:
      return setDefaultTxsForm
    default:
      return state
  }
}