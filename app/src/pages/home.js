import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import {connect} from 'react-redux'
import {Typography} from 'material-ui'
import {filter, contains, map} from 'ramda'
import List from 'material-ui/List'
import ResourceItem from '../components/resource-item'
import logo from '../logo.svg';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Login from './login'

class Home extends React.Component {

  logout() {
    this
      .props
      .auth
      .logout(this.props)
  }

  render() {

    const {isAuthenticated} = this.props.auth

    return (
      <div>
        {isAuthenticated() && (
          <div>
            <MenuAppBar title="Home" search={true} {...this.props}/>
            <Typography/>
            <List
              style={{
              padding: 0,
              paddingTop: 60,
              marginBottom: 60
            }}>
              {map(transactions => <ResourceItem resource={transactions}/>, this.props.transactions)}
            </List>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this
              .logout
              .bind(this)}>
              Log Out
            </Button>
          </div>

        )}
        {!isAuthenticated() && (
          <div><MenuAppBar title="Login"/><Login {...this.props}/></div>
        )}
      </div>
    )
  }
}

const connector = connect(state => {
  console.log("state", state)
  return {
    transactions: state.allTransactions,
    user: state.activeUser
    // favorites: filter(resource => contains(resource._id, state.favorites),
    // state.resources)
  }
}, dispatch => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'})
  }
})
export default withRoot(withDrawer(connector(Home)))