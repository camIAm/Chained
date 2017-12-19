import React from 'react'
import UserProfileItem from '../components/user-profile-item'
import {map, not} from 'ramda'
const loading = require('../loading.svg')
const UserProfileList = props => {
  return (
    <div>
      {not(props.load.loaded)
        ? <div id="custom-loader-container">
            <img id="custom-loader" src={loading} alt="loading"/>
          </div>
        : (
          <ul className="list pl0 mt0 measure center">
            {map(transactions => <UserProfileItem
              key={`${transactions._id}`}
              resource={transactions}
              user={props.user}
              changeUserProfile={props.changeUserProfile}
              props={props}/>, props.personalTxs)}
          </ul>
        )
}
    </div>
  )
}

export default UserProfileList