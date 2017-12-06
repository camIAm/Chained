import React from 'react'
import {withRouter} from 'react-router-dom'

import {ListItem, ListItemAvatar, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
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

const SearchItem = ({resource, history}) => {
  const removeArticles = arrData => contains(head(arrData), ['the', 'a', 'an'])
    ? drop(1, arrData)
    : arrData

  // be careful with this method. Temporary solution only
  const userify = fullUser => compose(join(' '), slice(1, Infinity), split('_'))(fullUser)
  return (
    <div key={resource._id}>
      <ListItem button onClick={e => {}}>
        <ListItemAvatar>
        <Avatar>{resource.firstName}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${userify(resource.firstName)}`}
          secondary={resource.userName}/>

      </ListItem>

      <Divider/>
    </div>
  )
}
export default withRouter(SearchItem)