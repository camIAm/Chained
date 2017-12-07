import React from 'react';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


class ReceiptTicket extends React.Component {
  ///profile/user_rcmontgo/ba44400c583b0c952e5a0040a3009130
  // maybe dispatch to an action creator to pull txs/{id} out of the redux state store
  componentDidMount() {

    //this.props.onMount()
  }
  render(){
  return (
    <div>
      <Paper  elevation={4}>
        <Typography type="headline" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography type="body1" component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
    </div>
  )
}
}

export default ReceiptTicket;