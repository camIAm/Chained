import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import {connect} from 'react-redux'
import {
  filter,
  contains,
  map,
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
import ProfileItem from '../components/profile-item'
import {setPersonalTransactions, setAllTransactions} from '../action-creators/txs'
import {bankDeposit} from '../action-creators/bank'
import {userify} from '../lib/userify'
import '../App.css'
import '../components/profile-item.css'
import SecondaryMenu from '../components/secondaryMenu'
const loading = require('../loading.svg')

class Profile extends React.Component {
  componentDidMount() {

    this
      .props
      .setPersonalTxs(this.props.user.id)
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

    const {vertical, horizontal} = this.state;
    const menuItemActions = [
      {
        name: 'Search',
        link: `/search/${this.props.user.id}`,
        fn: null
      }, {
        name: 'Manage Account',
        link: null,
        fn: null
      }
    ]
    return (
      <div>
        <MenuAppBar title="Profile" search={true} {...this.props}/>
        <Card style={{
          padding: 0,
          paddingTop: 60
        }}>
          <CardHeader
            avatar={< Avatar > {
            compose(toUpper(), slice(0, 1))(this.props.user.firstName)
          } < /Avatar>}
            action={< IconButton > <SecondaryMenu actions={menuItemActions} {...this.props}/> < /IconButton>}
            title={`${this.props.user.firstName} ${this.props.user.lastName}`}
            subheader={userify(this.props.user.id)}/>
          <CardActions disableActionSpacing>
            <div style={{
              paddingLeft: 20
            }}>
              {` $ ${this.props.user.balance}`}
            </div>

            <div style={{
              paddingLeft: 20
            }}>
              <Button raised dense onClick={this.handleClickOpen}>Cash Out</Button>
              <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                <DialogTitle>{"Ready to cash out?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    It will take 3-5 business days before the withdraw enters your bank account.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleRequestClose} color="primary">
                    Disagree
                  </Button>
                  <Button
                    onClick={this.handleClick({vertical: 'bottom', horizontal: 'center'})}
                    color="primary"
                    autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </CardActions>
          <Collapse timeout="auto" unmountOnExit>
            <CardContent></CardContent>
          </Collapse>
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
        {!this.props.load.loaded
          ? <div id="custom-loader-container">
              <img id="custom-loader" src={loading} alt="loading"/>
            </div>
          : (
            <ul class="list pl0 mt0 measure center">
              {map(transactions => <ProfileItem resource={transactions} user={this.props.user} props={this.props}/>, this.props.personalTxs)}
            </ul>
          )}
      </div >
    )
  }
}

const connector = connect(state => {
  return {personalTxs: state.personalTxs, user: state.activeUser, load: state.load}
}, dispatch => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'}),
    setPersonalTxs: userID => dispatch(setPersonalTransactions(userID)),
    bankDeposit: () => dispatch(bankDeposit)
  }
})
export default withRoot(withDrawer(connector(Profile)))