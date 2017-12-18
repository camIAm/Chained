import React from 'react'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {ListItem, ListItemAvatar, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import {userify} from '../lib/userify'
//import ResourceMenuItem from './resource-item-menu'

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

const SearchItem = ({resource}) => {
  return (
    <div key={resource._id}>
      <Link
        key={resource._id}
        to={`send/${resource._id}`}
        style={{
        textDecoration: 'none'
      }}
        className="w-100  animated fadeInRight">
        <ListItem button onClick={e => {}}>
          <ListItemAvatar>
            <Avatar>{compose(toUpper(), slice(0, 1))(resource.firstName)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${userify(resource.firstName)}`}
            secondary={resource.userName}/>
        </ListItem>
      </Link>
      <Divider/>
    </div>
  )
}
export default withRouter(SearchItem)