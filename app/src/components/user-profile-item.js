import React from 'react'
import {withRouter} from 'react-router-dom'
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {ListItem, ListItemAvatar, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import {userify} from '../lib/userify'
//import ResourceMenuItem from './resource-item-menu'
import {Link} from 'react-router-dom'

import './profile-item.css'
import {
  slice,
  path,
  prop,
  last,
  toUpper,
  contains,
  equals,
  head,
  drop,
  compose,
  toLower,
  join,
  split
} from 'ramda'

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

const ProfileItem = ({props, resource, user}) => {

  const pathID = prop('match')(props)
    ? path(['match', 'params', 'id'])(props)
    : compose(last, split('/'), path(['location', 'pathname']))(props)

  // Improve resource item design to include description and time or txs Add link
  // to receipt (paper material-ui component)
  return (
    <div key={resource._id}>

      <li class="flex items-center lh-copy pa3 ph0-l bb b--black-10">
        <Avatar className="w2 h2 w3-ns h3-ns br-100">{`${compose(toUpper(), slice(0, 1), join(' '), split(' '), toLower(), userify)(resource.sender)}`}</Avatar>
        <div class="pl3 flex-auto">
          {equals(resource.sender, user.id)
            ? <span class="f6 db black-70">
                <Link
                  to={`/profile/${resource.sender}`}
                  style={{
                  textDecoration: 'none',
                  color: '#000000'
                }}>{`${userify(resource.sender)}  `}
                </Link>
                sent
                <Link
                  to={`/user/${resource.recipient}`}
                  style={{
                  textDecoration: 'none',
                  color: '#000000'
                }}>
                  {`  ${userify(resource.recipient)}`}
                </Link>
              </span>
            : <span class="f6 db black-70">
              <Link
                to={`/user/${resource.sender}`}
                style={{
                textDecoration: 'none',
                color: '#000000'
              }}>{`${userify(resource.sender)}  `}
              </Link>
              sent
              <Link
                to={`/profile/${resource.recipient}`}
                style={{
                textDecoration: 'none',
                color: '#000000'
              }}>
                {`  ${userify(resource.recipient)}`}
              </Link>
            </span>
}
          <span class="f6 db black-70">{resource.description}</span>
        </div>

      </li>

      <Divider/>
    </div>
  )
}
export default withRouter(ProfileItem)
