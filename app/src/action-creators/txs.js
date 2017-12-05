import fetch from 'isomorphic-fetch'
import {ALL_TRANSACTIONS, PERSONAL_TXS} from '../constants'
import history from '../history'

const url = process.env.REACT_APP_BASE_URL

export const setAllTransactions = async(dispatch, getState) => {

  //console.log("REACT_APP_BASE_URL ", process.env.REACT_APP_BASE_URL)
  const response = await fetch("http://localhost:4000/txs")
    .then(res => res.json())
    .catch(err => console.log('err: ', err));
  if (!response.ok) {
    console.log("the response: ", response)
  }
  dispatch({type: ALL_TRANSACTIONS, payload: response})
}

export const setPersonalTransactions = user => async(dispatch, getState) => {
  console.log("setPersonalTxs user: ", user)

  const results = getState().allTransactions
  console.log("all txs inside setPersonal ", results)
  dispatch({type: PERSONAL_TXS, payload: results})
}