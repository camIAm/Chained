import fetch from 'isomorphic-fetch'
import {SET_ALL_USERS} from '../constants'
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

  console.log("REACT_APP_BASE_URL ", process.env.REACT_APP_BASE_URL)
  const response = await fetch("http://localhost:4000/users")
    .then(res => res.json())
    .catch(err => console.log('err: ', err));
  if (!response.ok) {
    console.log("the response: ", response)
  }
  console.log("the response ok: ", response)
  
  dispatch({
    type: SET_ALL_USERS,
    payload: response
  })
}