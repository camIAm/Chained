import React from 'react'
const loading = require('../loading.svg')

class Callback extends React.Component {
  render() {
    return (
      <div>
        <img src={loading} alt="loading"/>
      </div>
    )
  }
}

export default Callback