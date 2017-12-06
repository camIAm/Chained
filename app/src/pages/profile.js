import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import {connect} from 'react-redux'
import {filter, contains, map, compose, join, slice,split} from 'ramda'
import List from 'material-ui/List'
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ResourceItem from '../components/resource-item'
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
      <div >
        <CardContent >
          <Typography type="headline">{`${this.props.user.firstName} ${this.props.user.lastName}`}</Typography>
          <Typography type="subheading" color="secondary">
          {userify(this.props.user.id)}
          </Typography>
        </CardContent>
      </div>  
    </Card>
    < List
     style = {{
          padding: 0,
          marginBottom: 60
        }} > {map(transactions => <ResourceItem resource={transactions}/>, this.props.personalTxs) } 
        < /List>
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