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

class Home extends React.Component {
  
  render() {
    return (
      <div>
        <MenuAppBar title="Home"/>
        <Typography/>
        <List
          style={{
          padding: 0,
          paddingTop: 60,
          marginBottom: 60
        }}>
          {map(transactions => <ResourceItem resource={transactions}/>, this.props.transactions)}
        </List>
      </div>

    )
  }
}

const connector = connect(state => {
  console.log("state", state)
  return {
    transactions: state.allTransactions
    // favorites: filter(resource => contains(resource._id, state.favorites),
    // state.resources)
  }
}, dispatch => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'})
  }
})
export default withRoot(withDrawer(connector(Home)))