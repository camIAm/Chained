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
import RequestItem from '../components/request-item'
import {setAllTransactions} from '../action-creators/txs'
import {setPersonalRequest} from '../action-creators/request'
import '../App.css'
import {declineRequest, payRequest} from '../action-creators/request'
import {Link} from "react-router-dom"
import {userify} from '../lib/userify'
const loading = require('../loading.svg')

class Notification extends React.Component {

  componentDidMount() {
    this
      .props
      .setPersonalRequest()
  }

  render() {
    return (
      <div>
        <MenuAppBar title="Payment Requests" search={true} {...this.props}/>

        <Card style={{
          padding: 0,
          paddingTop: 60
        }}>
          <CardHeader
            avatar={< Avatar > {
            compose(toUpper(), slice(0, 1))(this.props.user.firstName)
          } < /Avatar>}
            action={< div style = {{ paddingRight: 20, paddingTop: 15 }} > <Link
            to={'/search/${user.id}'}
            className="no-underline no-focus"
            style={{
            textDecoration: 'none'
          }}>
            <Button raised dense>
              Request
            </Button>
          </Link> < /div>}
            title={`${this.props.user.firstName} ${this.props.user.lastName}`}
            subheader={userify(this.props.user.id)}/>

          <Collapse timeout="auto" unmountOnExit>
            <CardContent></CardContent>
          </Collapse>
        </Card>
        {!this.props.load.loaded
          ? <div id="custom-loader-container">
              <img id="custom-loader" src={loading} alt="loading"/>
            </div>
          : ( < List style = {{
          padding: 0,
          marginBottom: 60
        }} > {
            map(transactions => <RequestItem
              declineRequest={this.props.declineRequest}
              payRequest={this.props.payRequest}
              resource={transactions}
              user={this.props.user}/>, this.props.personalRequests)
          } < /List>
        )}
      </div >
    )
  }
}

const connector = connect(state => {
  return {
    //transactions: state.allTransactions
    personalRequests: state.personalRequests,
    user: state.activeUser,
    load: state.load
    // favorites: filter(resource => contains(resource._id, state.favorites),
    // state.resources)
  }
}, dispatch => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'}),
    setPersonalRequest: () => dispatch(setPersonalRequest),
    setAllTxs: () => dispatch(setAllTransactions),
    declineRequest: id => {
      console.log("declineRequest id:", id);
      dispatch(declineRequest(id))
    },
    payRequest: id => {
      console.log("payRequest id:", id);
      dispatch(payRequest(id))
    }
  }
})
export default withRoot(withDrawer(connector(Notification)))