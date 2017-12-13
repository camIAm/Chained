import React from 'react'
import {withRouter} from 'react-router-dom'

import {ListItem, ListItemAvatar, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import {userify} from '../lib/userify'
//import ResourceMenuItem from './resource-item-menu'
import {Link} from 'react-router-dom'

import {
  slice,
  toUpper,
  contains,
  head,
  drop,
  compose,
  toLower,
  join,
  split
} from 'ramda'

/*
{
"_id": "bad54e41828901ea0b7808f155003329",
"_rev": "1-e949fc39508c6f6fab2ab89f93a91af2",
"recipient": "user_bill",
"amount": "99",
"description": "Request with API hooked up",
"timeStamp": "1513175467916",
"currency": "USDTEST",
"requestee": "user_bill",
"requester": "user_rcmontgo"
}
*/
const RequestItem = ({resource, user}) => {

  // Improve resource item design to include description and time or txs Add link
  // to receipt (paper material-ui component)
  return (
    <div key={resource._id}>
    
    <Link to={`/profile/${user.id}/${resource._id}`} style={{
        textDecoration: 'none'
      }}>
      <ListItem button onClick={e => {}}>
        <ListItemAvatar>
          <Avatar>
            {compose(toUpper(), slice(0, 1), join(' '), split(' '), toLower(), userify)(resource.requester)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${userify(resource.requester)} requests ${userify(resource.requestee)}`}
          secondary={resource.amount}/>

      </ListItem>
  </Link>
      <Divider/>
    </div>
  )
}
export default withRouter(RequestItem)