import fetch from 'isomorphic-fetch'
import {SET_PAYMENT_REQUEST, CLEAR_SEND_FORM, PERSONAL_REQUESTS, ERROR} from '../constants'
import history from '../history'
import {
  filter,
  propEq,
  prop,
  or,
  not,
  dissoc,
  reverse,
  sortBy,
  merge,
  find,
  isEmpty,
  compose,
  assoc,
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
  requestToPost = dissoc("recipient",requestToPost)
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

export const setPersonalRequest = async(dispatch, getState) => {
  dispatch(setAllRequests).then(() => {
    const allRequests = getState().allRequests
    const activeUser = getState().activeUser.id
    const requester = propEq('requester', activeUser)
    const requestee = propEq('requestee', activeUser)
    const sortByTimeStamp = sortBy(prop('timeStamp'));
    const requesterRequest = filter(requester, allRequests)
    const requesteeRequest = filter(requestee, allRequests)
    const setPersonalRequest = concat(requesterRequest, requesteeRequest)
    dispatch({
      type: PERSONAL_REQUESTS,
      payload: reverse(sortByTimeStamp(setPersonalRequest))
    })
  })
}

export const declineRequest = requestID => async(dispatch, getState) => {
  const response = await fetch(`${url}/requests/${requestID}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  }).then(res => res.json())

  console.log("response in declineRequest: ", response)

  if (!response.ok) {
    dispatch({type: ERROR, payload: 'Could not decline request'})
    return
  }
  dispatch(setPersonalRequest)
}

export const payRequest = requestID => async(dispatch, getState) => {
  let allRequests = getState().allRequests
  let requestToPay = find(propEq('id', requestID))(allRequests)
  // requestee will be the sender and requester will be the recipient in txs
  console.log("requestToPay: ",requestToPay)
  const requester=prop('requester',requestToPay)
  const requestee=prop('requestee',requestToPay)
  const payObj = compose(dissoc('requestee'),
  dissoc('requester'),
  assoc('timeStamp',"now"),
  assoc('recipient',requester),
  assoc('sender',requestee),
  dissoc('_rev'),
  dissoc('_id'))(requestToPay)
  console.log("payObj: ",payObj)
  
  if(not(isEmpty(payObj))){
    const response = await fetch(`${url}/requests/${requestID}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).then(res => res.json())
    console.log("response in payRequest: ", response)
  
    if (!response.ok) {
      dispatch({type: ERROR, payload: 'Could not pay request'})
      return
    }
  }
  dispatch(setPersonalRequest)
}