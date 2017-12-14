import React from 'react'
import {withStyles} from 'material-ui/styles'
import SaveIcon from 'material-ui-icons/Save'
import {UPDATE_NEW_TXS_FORM, SUBMIT_NEW_TXS} from '../constants'
import {createTxs, isActive} from '../action-creators/txs'
import {createRequest} from '../action-creators/request'
import {connect} from 'react-redux'
import {transactionForm} from '../reducers/txs/searchTxs';
import {prop, path, compose, split, last} from 'ramda'
import {Link} from 'react-router-dom'
import withDrawer from './withDrawer'
import withRoot from './withRoot'
import Send from 'material-ui-icons/Send';
import Delete from 'material-ui-icons/Delete';
import {userify} from '../lib/userify'

import {
  AppBar,
  List,
  Input,
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  Typography,
  Select,
  Toolbar,
  Button,
  IconButton,
  Icon,
  Snackbar
} from 'material-ui'
import MenuAppBar from './menuAppBar'

const styles = theme => ({
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
  formControl: {
    margin: theme.spacing.unit
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  firstButton: {
    marginLeft: -12,
    marginRight: 12
  },
  lastButton: {
    marginLeft: 12,
    marginRight: -12
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

class SendForm extends React.Component {

  componentDidMount() {
    const pathID = prop('match')(this.props)
      ? path(['match', 'params', 'id'])(this.props)
      : compose(last, split('/'), path(['location', 'pathname']))(this.props)

    this
      .props
      .onChange('recipient', pathID)

  }
  // add appBar with the ability to cancel txs
  render() {
    console.log('in SendForm')
    console.log("this.props.activeUser.id")
    const {classes} = this.props
    return (
      <div >
        <MenuAppBar title="Transactions" goBack {...this.props}/>
        <form
          style={{
          marginTop: 60,
          marginLeft: 12,
          marginRight: 12
        }}
          autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="user">Selected User</InputLabel>
            <Input
              value={userify(this.props.transactionForm.recipient)}
              margin="normal"
              required/>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <Input
              value={this.props.transactionForm.amount}
              onChange={e => {
              this
                .props
                .onChange('amount', e.target.value)
            }}
              margin="normal"
              required
              startAdornment={< InputAdornment position = "start" > $ < /InputAdornment>}/>
          </FormControl >
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              value={this.props.transactionForm.description}
              onChange={e => {
              this
                .props
                .onChange('description', e.target.value)
            }}
              margin="normal"
              required
              multiline/>
          </FormControl>
          <div
            className={classes.formControl}
            style={{
            display: 'flex',
            width: '100%'
          }}>
            <Button
              style={{
              width: '100%'
            }}
              className={classes.formControl}
              raised
              color="primary"
              type="submit"
              aria-label="send"
              className="fab-button"
              disabled={this.props.transactionForm.amount && this.props.transactionForm.description
              ? false
              : true}
              onClick={this.props.createTxs}>
              Send
              <Send className={classes.rightIcon}/>
            </Button>
            <Button
              className={classes.formControl}
              style={{
              width: '100%'
            }}
              raised
              color="accent"
              type="submit"
              aria-label="request"
              className="fab-button"
              disabled={this.props.transactionForm.amount && this.props.transactionForm.description
              ? false
              : true}
              onClick={this.props.createRequest}>
              Request
              <Delete className={classes.rightIcon}/>
            </Button>
          </div>
        </form>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {transactionForm: state.transactionForm, activeUser: state.activeUser}
}

const mapActionsToProps = dispatch => {
  return {

    createTxs: e => {
      e.preventDefault()
      dispatch(createTxs)
    },
    createRequest: e => {
      e.preventDefault()

      dispatch(createRequest)
    },
    onChange: (field, value) => {
      dispatch({
        type: UPDATE_NEW_TXS_FORM,
        payload: {
          [field]: value
        }
      })
      dispatch(isActive)
    },
    isActive: () => dispatch({})
  }
}
const connector = connect(mapStateToProps, mapActionsToProps)

export default withRoot(withDrawer(connector(withStyles(styles)(SendForm))))