import fetch from 'isomorphic-fetch'
import {SET_PAYMENT_REQUEST, CLEAR_SEND_FORM, ERROR} from '../constants'
import history from '../history'
import {
  filter,
  propEq,
  prop,
  or,
  reverse,
  sortBy,
  merge,
  find,
  isEmpty,
  concat
} from "ramda"

//const url = process.env.REACT_APP_BASE_URL

export const createRequest = async(dispatch, getState) => {
  let txsToPost = getState().transactionForm
  const activeUser = getState().activeUser
  // requestee which is passed in can be replaced with txsToPost.recipient
  txsToPost = merge(txsToPost, {
    'timeStamp': Date
      .now()
      .toString(),
    "currency": "USDTEST",
    "requestee": txsToPost.recipient,
    "requester": activeUser.id
  })
  // payment requests should have their own api endpoints eventually
  console.log("creating request in action-creator: ", txsToPost)
  dispatch({type: SET_PAYMENT_REQUEST, payload: txsToPost})
  console.log("create-request after dispatch")
  console.log("payload in create-request", txsToPost)
  // console.log(`/profile/${activeUser.id}`) clear form
  dispatch({type: CLEAR_SEND_FORM})
  history.push(`/profile/${activeUser.id}`)
}