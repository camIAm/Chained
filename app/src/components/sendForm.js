import React from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SaveIcon from 'material-ui-icons/Save'

const styles = theme => ({
  input: {
    width: '50%',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

class SendForm extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <form
        style={{ marginTop: 8 }}
        autoComplete="off"
        onSubmit={this.props.createCategory}
      >
        <TextField
          label="Name"
          value={this.props.category.name}
          onChange={e => {
            this.props.onChange('name', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
        />
        <TextField
          label="Short Description"
          value={this.props.category.shortDesc}
          onChange={e => {
            this.props.onChange('shortDesc', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
          multiline
        />
        <TextField
          label="Description"
          value={this.props.category.desc}
          onChange={e => {
            this.props.onChange('desc', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
          multiline
        />
        <TextField
          label="Icon"
          value={this.props.category.icon}
          onChange={e => {
            this.props.onChange('icon', e.target.value)
          }}
          margin="normal"
          required
          className={classes.input}
        />
        <Button
          fab
          color="primary"
          type="submit"
          aria-label="add"
          className="fab-button"
          disabled={this.props.isActive}
        >
          <SaveIcon />
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(SendForm)