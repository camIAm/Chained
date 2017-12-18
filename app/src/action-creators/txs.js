import fetch from 'isomorphic-fetch'
import {
  SET_ALL_TRANSACTIONS,
  SINGLE_TX,
  IS_ACTIVE,
  PERSONAL_NA_TXS,
  PERSONAL_TXS,
  DATA_LOADED,
  CLEAR_SEND_FORM,
  ERROR
} from '../constants'
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

export const setAllTransactions = async(dispatch, getState) => {
  const response = await fetch(`${url}/txs`)
    .then(res => res.json())
    .catch(err => console.log('err: ', err));
  if (!response) {
    console.log("inside !response.ok", response);
    return
  }
  const sortByTimeStamp = sortBy(prop('timeStamp'))
  dispatch({
    type: SET_ALL_TRANSACTIONS,
    payload: reverse(sortByTimeStamp(response))
  })
  dispatch({type: DATA_LOADED, payload: true})
}

export const setPersonalTransactions = userID => async(dispatch, getState) => {
  dispatch(setAllTransactions).then(() => {
    const allTxs = getState().allTransactions
    const senderTxs = filter(propEq('sender', userID), allTxs)
    const recipientTxs = filter(propEq('recipient', userID), allTxs)
    const personalTxs = concat(senderTxs, recipientTxs)
    dispatch({
      type: PERSONAL_TXS,
      payload: reverse(sortBy(prop('timeStamp'))(personalTxs))
    })
  })
}

// create transaction form sendForm
export const createTxs = async(dispatch, getState) => {
  let txsToPost = getState().transactionForm
  const activeUser = getState().activeUser
  txsToPost = merge(txsToPost, {
    'timeStamp': Date
      .now()
      .toString(),
    "currency": "USDTEST",
    "sender": activeUser.id
  })

  console.log("txtToPost POST merge in actioncreator: ", txsToPost)
  // POST txsToPost then dispatch to setAllTransactions to update redux state
  // store
  const response = await fetch(`${url}/txs`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(txsToPost)
  }).then(res => res.json())

  if (!response.ok) {
    dispatch({type: ERROR, payload: 'Could not add txs'})
    return
  }
  dispatch(setAllTransactions)
  // clear form
  dispatch({type: CLEAR_SEND_FORM})
  history.push(`/profile/${activeUser.id}`)
}
export const createTxsFromRequestPayment = payObj => async(dispatch, getState) => {

  const activeUser = getState().activeUser

  console.log("payObj in createTxsFromRequestPayment: ", payObj)
  // POST txsToPost then dispatch to setAllTransactions to update redux state
  // store
  const response = await fetch(`${url}/txs`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payObj)
  }).then(res => res.json())

  if (!response.ok) {
    dispatch({type: ERROR, payload: 'Could not add txs'})
    return
  }
  dispatch(setAllTransactions)
  // clear form
  dispatch({type: CLEAR_SEND_FORM})
  history.push(`/profile/${activeUser.id}`)
}

export const getTx = txID => async(dispatch, getState) => {
  dispatch({
    type: SINGLE_TX,
    payload: find(propEq('_id', `${txID}`))(getState().allTransactions)
  })

}

// modify
export const isActive = async(dispatch, getState) => {
  const currentData = !isEmpty(getState().transactionForm.recipient)
  const {name, desc, shortDesc, icon} = currentData
  if (isEmpty(name) || isEmpty(desc) || isEmpty(shortDesc) || isEmpty(icon)) {
    dispatch({type: IS_ACTIVE, payload: true})
  } else {
    dispatch({type: IS_ACTIVE, payload: false})
  }
}