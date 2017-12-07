import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import {connect} from 'react-redux'
import {filter, contains, map, compose, join, toUpper,slice,split} from 'ramda'
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
import ProfileItem from '../components/profile-item'
import {setPersonalTransactions, setAllTransactions} from '../action-creators/txs'

const userify = fullUser => compose(join(' '), slice(1, Infinity), split('_'))(fullUser)

class Profile extends React.Component {

  componentDidMount() {
   

    this
      .props
      .setPersonalTxs(this.props.user)
  }
  render() {
    return (
      <div>
      <MenuAppBar title="Profile"/>
      
      <Card style={{
          padding: 0,
          paddingTop: 60
        }}>
          <CardHeader
            avatar={
              <Avatar aria-label="User Avatar" >
                {compose(toUpper(), slice(0, 1))(this.props.user.firstName)}
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={`${this.props.user.firstName} ${this.props.user.lastName}`}
            subheader={userify(this.props.user.id)}
          />
          <CardMedia
           
            image="/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          />
         
          <CardActions disableActionSpacing>
          <div style={{
          paddingLeft: 20
        }}>
          {` $ ${this.props.user.balance}`}
          </div>
            <IconButton aria-label="Cash out to bank account">
            <i class="material-icons">get_app</i>
            </IconButton>
            <div style={{
          paddingRight: 0
        }}>
              Cash Out
            </div>
          </CardActions>
          <Collapse  timeout="auto" unmountOnExit>
            <CardContent>
            </CardContent>
          </Collapse>
        </Card>
    < List
     style = {{
          padding: 0,
          marginBottom: 60
        }} >
         {map(transactions => <ProfileItem resource={transactions} user={this.props.user}/>, this.props.personalTxs) } 
        </List>
      </div >
      )
  }
}

const connector = connect(state => {
  return {
    //transactions: state.allTransactions
    personalTxs: state.personalTxs,
    user: state.activeUser
    // favorites: filter(resource => contains(resource._id, state.favorites),
    // state.resources)
  }
}, dispatch => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'}),
    setPersonalTxs: user => dispatch(setPersonalTransactions(user)),
    setAllTxs: () => dispatch(setAllTransactions)
  }
})
export default withRoot(withDrawer(connector(Profile)))