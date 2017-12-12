import React from 'react'
import {withStyles} from 'material-ui/styles'
import SaveIcon from 'material-ui-icons/Save'
import {UPDATE_NEW_TXS_FORM, SUBMIT_NEW_TXS} from '../constants'
import {createTxs, isActive} from '../action-creators/txs'
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
  TextField,
  FormControl,
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
  firstButton: {
    marginLeft: -12,
    marginRight: 12
  },
  lastButton: {
    marginLeft: 12,
    marginRight: -12
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
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
      <MenuAppBar title="Send Money" goBack {...this.props}/>
      <form
        style={{
        marginTop: 60
      }}
        autoComplete="off"
        onSubmit={this.props.createTxs}>
        <TextField
          label="Selected User"
          value={userify(this.props.transactionForm.recipient)}
          margin="normal"
          required
          />
          
        <TextField
          label="Amount"
          fullWidth
          value={this.props.transactionForm.amount}
          onChange={e => {
          this
            .props
            .onChange('amount', e.target.value)
        }}
          margin="normal"
          required
          
          multiline/>
        <TextField
          label="Description"
          fullWidth
          value={this.props.transactionForm.description}
          onChange={e => {
          this
            .props
            .onChange('description', e.target.value)
        }}
          margin="normal"
          required
          multiline/>
  <div style={{display: 'flex',width: '100%'}}>
        <Button
        style={{display: 'flex',width: '100%'}}
          raised
          color="primary"
          type="submit"
          aria-label="send"
          className="fab-button"
          disabled={false}>
          Send
          <Send className={classes.rightIcon} />
        </Button>
        <Button
        style={{display: 'flex',width: '100%'}}
          raised
          color="accent"
          type="submit"
          aria-label="request"
          className="fab-button"
          disabled={false}>
          Request
          <Delete className={classes.rightIcon} />
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