import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import {connect} from 'react-redux'
import {filter, contains, map} from 'ramda'
import List from 'material-ui/List'
import SearchItem from '../components/search-item'
import TextField from 'material-ui/TextField';
import {searchDocs} from '../lib/search/search-docs'
import {searchStringBuilder} from '../lib/search/build-search-string'

class Search extends React.Component {
  state = {
    value: ''
  }

  handleChange = (newValue) => {
    this.setState({value: newValue});
  };

  // Pull line 18-37 out into a search component and implement search
  render() {
    return (
      <div>
        <MenuAppBar title="Search"/>
        <form noValidate autoComplete="off">
          <TextField
            style={{
            paddingTop: 40,
            marginBottom: 0
          }}
            placeholder="Username or Name "
            helperText="Pay a friend!"
            fullWidth
            onChange={e => {
            this.handleChange(e.target.value)
          }}
            margin="normal"/>
        </form>
        <List style={{
          padding: 0,
          marginBottom: 60
        }}>
          {map(searchItem => <SearchItem resource={searchItem}/>, searchDocs(searchStringBuilder(['userName', 'firstName', 'lastName']), this.state.value)(this.props.allUsers))}
        </List>
      </div>

    )
  }
}

const connector = connect(state => {
  return {
    //transactions: state.allTransactions
    allUsers: state.allUsers
    // favorites: filter(resource => contains(resource._id, state.favorites),
    // state.resources)
  }
}, dispatch => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'})
  }
})
export default withRoot(withDrawer(connector(Search)))