import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import {connect} from 'react-redux'
import {filter, contains, map} from 'ramda'
import List from 'material-ui/List'
import ResourceItem from '../components/resource-item'
import {setPersonalTransactions, setAllTransactions} from '../action-creators/txs'

class Profile extends React.Component {

  componentDidMount() {
    this
      .props
      .toggleDrawer()

    this
      .props
      .setPersonalTxs(this.props.user)
  }
  render() {
    return (
      <div>
        <MenuAppBar title="Profile"/>
        <List style={{
          padding: 0,
          marginBottom: 60
        }}>
          {map(transactions => <ResourceItem resource={transactions}/>, this.props.personalTxs)}
        </List>
      </div>

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