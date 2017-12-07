import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux'
import {getTx} from '../action-creators/txs'
import {prop, path, compose, last, split} from 'ramda'

class ReceiptTicket extends React.Component {
  // /profile/user_rcmontgo/ba44400c583b0c952e5a0040a3009130 maybe dispatch to an
  // action creator to pull txs/{id} out of the redux state store
  componentWillMount() {
    const txID = prop('match')(this.props)
      ? path(['match', 'params', 'id', 'tx'])(this.props)
      : compose(last, split('/'), path(['location', 'pathname']))(this.props)

    this
      .props
      .getTx(txID)
  }
  render() {
    console.log("this.props.tx", this.props.tx)
    return (
      <div>
        <Paper elevation={4}>
          <Typography type="headline" component="h3">
            This is a sheet of paper.
          </Typography>
          <Typography type="body1" component="p">
            Paper can be used to build surface or other elements for your application. {this.props.tx.sender
              ? this.props.tx.sender
              : ''}
          </Typography>

        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("mapState in receipt")
  return {tx: state.singleTransaction}
}

const mapActionToProps = dispatch => {
  console.log("action fired")
  return {
    getTx: txID => {
      console.log("inside action")
      dispatch(getTx(txID))
    }
  }
}

const connector = connect(mapStateToProps, mapActionToProps)

export default connector(ReceiptTicket);