import React from 'react'
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';

class Login extends React.Component {

  login() {
    this
      .props
      .auth
      .login()
  }

  render() {
    return (
      <div>
        <Button
          style={{
          marginTop: 100,
          "justify-content": "center"
        }}
          raised
          color="primary"
          onClick={this
          .login
          .bind(this)}>
          Sign In
          <Send/>
        </Button>
      </div>
    )
  }
}

export default Login