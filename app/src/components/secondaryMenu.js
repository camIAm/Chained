import React from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, {MenuItem} from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import {map, propOr} from 'ramda'
import {Link} from 'react-router-dom'

/*
props.actions = [
{name: 'Edit', link: '/resources/???/edit'},
{name: 'Delete, link: '/resources/???/delete'}
]*/

const ITEM_HEIGHT = 48

class SecondaryMenu extends React.Component {
  state = {
    anchorEl: null,
    actions: this.props.actions
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleRequestClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const open = Boolean(this.state.anchorEl)
    const actions = propOr([], 'actions', this.state)
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open
          ? 'long-menu'
          : null}
          aria-haspopup="true"
          color="primary"
          style={{
          marginRight: -12
        }}
          onClick={this.handleClick}>
          <MoreVertIcon/>
        </IconButton>
        <Menu
          id="long-menu"
          color="primary"
          anchorEl={this.state.anchorEl}
          open={open}
          onRequestClose={this.handleRequestClose}
          PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}>
          {map(action => action.link
            ? (
              <Link
                key={action.name}
                to={action.link}
                className="no-underline no-focus"
                style={{
                textDecoration: 'none'
              }}>
                <MenuItem onClick={this.handleRequestClose}>
                  {action.name}
                </MenuItem>
              </Link>
            )
            : (
              <Link
                key={action.name}
                to={'#'}
                onClick={action.fn}
                className="no-underline no-focus"
                style={{
                textDecoration: 'none'
              }}>
                <MenuItem onClick={this.handleRequestClose}>
                  {action.name}
                </MenuItem>
              </Link>
            ), actions)}
        </Menu>
      </div>
    )
  }
}

export default SecondaryMenu