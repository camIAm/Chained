import {BANK_DEPOSIT} from '../constants'


export const bankDeposit = async(dispatch, getState) =>{
  const deposit = getState().activeUser.balance
  console.log("deposit in action-creator:",deposit)
  dispatch({type:BANK_DEPOSIT, payload:deposit})
}