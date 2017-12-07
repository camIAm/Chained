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

const ResourceItem = ({resource, history}) => {

  // Improve resource item design to include description and time or txs Add link
  // to receipt (paper material-ui component)
  return (
    <div key={resource._id}>
      <Link to={`/${resource._id}`} style={{ textDecoration: 'none', color: 'transparent' }}>
        <ListItem button onClick={e => {}}>
          <ListItemAvatar>
            <Avatar>
              {compose(toUpper(), slice(0, 1), join(' '), split(' '), toLower(), userify)(resource.sender)}
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={`${userify(resource.sender)} sent ${userify(resource.recipient)}`}
            secondary={resource.amount}/>

        </ListItem>
      </Link>
      <Divider/>
    </div>
  )
}
export default withRouter(ResourceItem)