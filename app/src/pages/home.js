import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import {connect} from 'react-redux'
import {Typography} from 'material-ui'
import {filter, contains, map} from 'ramda'
import List from 'material-ui/List'
import ResourceItem from '../components/resource-item'
import ResourceItem2 from '../components/resource-item2'
import logo from '../logo.svg';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Login from './login'
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';

import {setPersonalTransactions, setAllTransactions} from '../action-creators/txs'
class Home extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  componentDidMount() {
    this
      .props
      .setPersonalTxs(this.props.user.id)
  }

  logout() {
    this
      .props
      .auth
      .logout(this.props)
  }

  render() {
    const {value} = this.state;
    const {isAuthenticated} = this.props.auth

    return (
      <div>
        {isAuthenticated() && (
          <div>
            <MenuAppBar title="Home" search={true} {...this.props}/>
            <Typography/>
            <AppBar
              position="static"
              color="default"
              style={{
              padding: 0,
              paddingTop: 60
            }}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                scrollButtons="auto">
                <Tab label="Global"/>
                <Tab label="Personal"/>
              </Tabs>
            </AppBar>
            {value === 0 && <List>
              {map(transactions => <ResourceItem2 resource={transactions} user={this.props.user}/>, this.props.transactions)}
            </List>}
            {value === 1 && <List>
              {map(transactions => <ResourceItem resource={transactions} user={this.props.user}/>, this.props.personalTxs)}
            </List>}
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
          <div><Login {...this.props}/></div>
        )}
      </div>
    )
  }
}

const connector = connect(state => {
  console.log("state", state)
  return {transactions: state.allTransactions, user: state.activeUser, personalTxs: state.personalTxs}
}, dispatch => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'}),
    setPersonalTxs: user => dispatch(setPersonalTransactions(user))

  }
})
export default withRoot(withDrawer(connector(Home)))