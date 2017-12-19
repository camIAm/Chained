import React from 'react'
import {map, not} from 'ramda'
import ProfileItem from '../components/profile-item'
const loading = require('../loading.svg')
const ProfileList = props => {
  return (
    <div>{not(props.load.loaded)
        ? <div id="custom-loader-container">
            <img id="custom-loader" src={loading} alt="loading"/>
          </div>
        : (
          <ul className="list pl0 mt0 measure center">
            {map(transactions => <ProfileItem
              key={transactions._id}
              resource={transactions}
              user={props.user}
              props={props}/>, props.personalTxs)}
          </ul>
        )
}</div>
  )
}

export default ProfileList