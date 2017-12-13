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

const url = process.env.REACT_APP_BASE_URL

export const createRequest = async(dispatch, getState) => {
  let requestToPost = getState().transactionForm
  const activeUser = getState().activeUser
  // requestee which is passed in can be replaced with txsToPost.recipient
  requestToPost = merge(requestToPost, {
    'timeStamp': Date
      .now()
      .toString(),
    "currency": "USDTEST",
    "requestee": requestToPost.recipient,
    "requester": activeUser.id
  })
  const response = await fetch(`${url}/requests`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(requestToPost)
  }).then(res => res.json())

  console.log("response in createTxs: ", response)

  if (!response.ok) {
    dispatch({type: ERROR, payload: 'Could not add request'})
    return
  }
  dispatch(setAllRequests)
  // payment requests should have their own api endpoints eventually
  // console.log("creating request in action-creator: ", txsToPost)
  // dispatch({type: SET_PAYMENT_REQUEST, payload: requestToPost})
  dispatch({type: CLEAR_SEND_FORM})
  history.push(`/profile/${activeUser.id}`)
}

export const setAllRequests = async(dispatch, getState) => {
  const response = await fetch(`${url}/requests`)
    .then(res => res.json())
    .catch(err => console.log('err: ', err));
  // if (!response) {     console.log("inside !response.ok",response)     return }
  console.log("the response setAllTransactions: ", response)
  const sortByTimeStamp = sortBy(prop('timeStamp'))
  dispatch({
    type: SET_PAYMENT_REQUEST,
    payload: reverse(sortByTimeStamp(response))
  })
  // THIS dispatch my need to be modified to establish a bool flag value for
  // payment request dispatch({type: DATA_LOADED, payload: true})
}