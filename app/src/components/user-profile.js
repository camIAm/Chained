import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import {connect} from 'react-redux'
import {
  filter,
  contains,
  map,
  pathOr,

  compose,
  join,
  toUpper,
  slice,
  split
} from 'ramda'
import List from 'material-ui/List'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import {setNonActiveUserTransactions, setAllTransactions} from '../action-creators/txs'
import {setUser} from "../action-creators/user"
import {bankDeposit} from '../action-creators/bank'
import {prop, last, path} from 'ramda'
import {userify} from "../lib/userify"
import UserProfileList from './user-profile-list'
import '../App.css'
import '../components/profile-item.css'
import SecondaryMenu from '../components/secondaryMenu'

class UserProfile extends React.Component {
  componentDidMount() {
    const pathID = prop('match')(this.props)
      ? path(['match', 'params', 'id'])(this.props)
      : compose(last, split('/'), path(['location', 'pathname']))(this.props)
    console.log("USERPROFILE: ", pathID)
    console.log("this.props.user: ", this.props.user)
    console.log("this.props.nonActiveUsers: ", this.props.nonActiveUsers)
    this
      .props
      .setPersonalTxs(pathID)

    this
      .props
      .setUser(pathID)
  }
  state = {
    open: false,
    openSnack: false,
    vertical: null,
    horizontal: null
  };

  handleClick = state => () => {
    // set balance to zero
    this
      .props
      .bankDeposit()
    this.handleRequestClose()
    this.setState({
      openSnack: true,
      ...state
    });
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };
  handleSnackRequestClose = () => {
    this.setState({openSnack: false});
  };

  render() {
    const pathID = prop('match')(this.props)
      ? path(['match', 'params', 'id'])(this.props)
      : compose(last, split('/'), path(['location', 'pathname']))(this.props)
    const {vertical, horizontal} = this.state;
    const menuItemActions = [
      {
        name: 'Search',
        link: `/search/${this.props.nonActiveUsers.id}`,
        fn: null
      }
    ]
    console.log(`path([
      'nonActiveUsers', '_id'
    ], this.props)`, path([
      'nonActiveUsers', '_id'
    ], this.props))

    return (
      <div>
        <MenuAppBar title="Profile" search={true} {...this.props}/>

        <Card style={{
          padding: 0,
          paddingTop: 60
        }}>
          <CardHeader
            avatar={< Avatar > {
            compose(toUpper(), slice(0, 1))(this.props.nonActiveUsers.firstName)
          } < /Avatar>}
            action={< SecondaryMenu actions = {
            menuItemActions
          }
          {
            ...this.props
          } />}
            title={`${this.props.nonActiveUsers.firstName} ${this.props.nonActiveUsers.lastName}`}
            subheader={userify(this.props.nonActiveUsers._id)}/>
          <Snackbar
            anchorOrigin={{
            vertical,
            horizontal
          }}
            open={this.state.openSnack}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackRequestClose}
            SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
            message={< span id = "message-id" > Thank you for using Chained < /span>}/>
        </Card>
        <UserProfileList {...this.props}/>

      </div>
    )

  }

}

const connector = connect(state => {
  return {personalTxs: state.nonActiveTxs, nonActiveUsers: state.nonActiveUsers, user: state.activeUser, load: state.load}
}, dispatch => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'}),
    setPersonalTxs: user => dispatch(setNonActiveUserTransactions(user)),
    bankDeposit: () => dispatch(bankDeposit),
    setUser: user => dispatch(setUser(user)),
    changeUserProfile: e => user => {
      e.preventDefault()
      console.log("changeUserProfile hit with user: ", user)
      dispatch(setUser(user))
    }
  }
})

export default withRoot(withDrawer(connector(UserProfile)))

//user={this.props.nonActiveUsers} line 13