import React from 'react'
import {Drawer} from 'material-ui'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import InboxIcon from 'material-ui-icons/Inbox'
import HomeIcon from 'material-ui-icons/Home'
import HelpIcon from 'material-ui-icons/Help'
import SearchIcon from 'material-ui-icons/Search'
import Avatar from 'material-ui/Avatar'
import ViewList from 'material-ui-icons/ViewList'
import FavoriteIcon from 'material-ui-icons/Favorite'
import LockOutlineIcon from 'material-ui-icons/LockOutline'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import GavelIcon from 'material-ui-icons/Gavel'
import {pink} from 'material-ui/colors';

const styles = {
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500]
  }
}

const SideList = ({activeUser}) => {
return (
  <div>
    <List>
      <Link
        to="/"
        className="router-link"
        style={{
        textDecoration: 'none'
      }}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary="Home"/>
        </ListItem>
      </Link>
      <Link
        to={`/search/${activeUser.id}`}
        className="router-link"
        style={{
        textDecoration: 'none'
      }}>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon/>
          </ListItemIcon>
          <ListItemText primary="Search"/>
        </ListItem>
      </Link>
      <Link
        to={`/profile/${activeUser.id}`}
        className="router-link"
        style={{
        textDecoration: 'none'
      }}>
        <ListItem button>
          <ListItemIcon>
            <Avatar >
              <i className="material-icons">face</i>
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Profile"/>
        </ListItem>
      </Link>
      <Link
        to={`/notifications/${activeUser.id}`}
        className="router-link"
        style={{
        textDecoration: 'none'
      }}>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon/>
          </ListItemIcon>
          <ListItemText primary="Notifications"/>
        </ListItem>
      </Link>
      </List>
    <Divider/>
    <List>
      <Link
        to="/settings"
        className="router-link"
        style={{
        textDecoration: 'none'
      }}>
        <ListItem button>
          <ListItemIcon>
            <Avatar>
              <i className="material-icons">settings</i>
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Settings"/>
        </ListItem>
      </Link>

      <Divider/>
    </List>
  </div>
)
}
const withDrawer = function (PageComponent) {
  const WrapDrawerComponent = props => {
    return (
      <div>
        <PageComponent {...props}/>
        <Drawer open={props.open} onRequestClose={props.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={props.toggleDrawer}
            onKeyDown={props.toggleDrawer}>
            <SideList activeUser={props.activeUser}/>
          </div>
        </Drawer>
      </div>
    )
  }
  const mapStateToProps = state => {
    return {
      open: state.drawer.open,
      activeUser: state.activeUser
    }
  }
  const mapActionsToProps = dispatch => {
    return {
      toggleDrawer: () => {
        dispatch({type: 'TOGGLE_DRAWER'})
      }
    }
  }
  const connector = connect(mapStateToProps, mapActionsToProps)
  return connector(WrapDrawerComponent)
}

export default withDrawer