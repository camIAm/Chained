import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import {connect} from 'react-redux'
import {filter, contains, map} from 'ramda'
import List from 'material-ui/List'
import SearchItem from '../components/search-item'
import TextField from 'material-ui/TextField';

class Search extends React.Component {
  componentDidMount() {
   
  }
  render() {
    return (
      <div>
        <MenuAppBar title="Search"/>
        <form noValidate autoComplete="off">
        <TextField 
        style={{
          paddingTop: 30,
          
          marginBottom: 0
        }}
        label="With placeholder multiline"
        placeholder="Username or Name"
        helperText="Pay a friend!"
        fullWidth
        margin="normal"
        />
        </form>
        <List style={{
          padding: 0,
          marginBottom: 60
        }}>
          {map(searchItem => <SearchItem resource={searchItem}/>, this.props.searchItems)}
        </List>
      </div>

    )
  }
}

const connector = connect(state => {
  return {
    //transactions: state.allTransactions
    searchItems: state.allUsers
    // favorites: filter(resource => contains(resource._id, state.favorites),
    // state.resources)
  }
}, dispatch => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'})
  }
})
export default withRoot(withDrawer(connector(Search)))