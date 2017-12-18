import fetch from 'isomorphic-fetch'
import {SET_ALL_USERS, SET_NON_ACTIVE_USERS} from '../constants'
import history from '../history'
import {
  filter,
  propEq,
  prop,
  or,
  reverse,
  sortBy,
  concat
} from "ramda"

const url = process.env.REACT_APP_BASE_URL

export const setAllUsers = async(dispatch, getState) => {
  const response = await fetch(`${url}/users`)
    .then(res => res.json())
    .catch(err => console.log('err: ', err));
  if (!response.ok) {
    console.log("the response: ", response)
  }
  dispatch({type: SET_ALL_USERS, payload: response})
}

// non active user
export const setUser = userID => async(dispatch, getState) => {
  const response = await fetch(`${url}/users/${userID}`)
    .then(res => res.json())
    .catch(err => console.log('err: ', err));
  if (!response.ok) {
    console.log("the response: ", response)
  }
  dispatch({type: SET_NON_ACTIVE_USERS, payload: response})
}