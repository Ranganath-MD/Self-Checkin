import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import logo from '../../Assets/logo.png'

const styles = theme => ({
  input: {
    margin: theme.spacing(2),
  },
  text: {
    marginTop: "50px"
  },

  button: {
    marginTop: '20px',
    width: '180px'
  }

});
class Confirm extends Component {


  back = e => {
    e.preventDefault();
    this.props.prevStep1();
  };

  render() {
    const { values: { name, company, email, phone, designation } } = this.props;
    const { handleSubmitForm } = this.props
    const { classes } = this.props;
    return (
      <div >
        <center>
          <img src={logo} alt='mverve' style={{ paddingTop: '20px', width: '180px', height: '65px' }}></img>
        </center>
        <div className={classes.form} >
          <div className="container" style={{ marginTop: '40px' }}>
            <Grid container spacing={0}>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={8}>
                <MuiThemeProvider>
                  <center>
                    <React.Fragment>
                      <h3 style={{ color: '#4b3d78', fontStyle: 'sans-serif' }}>Confirm Details </h3>
                      <List>
                        <ListItem primaryText="Name" secondaryText={name} />
                        <ListItem primaryText="Company" secondaryText={company} />
                        <ListItem primaryText="Email" secondaryText={email} />
                        <ListItem primaryText="Phone no" secondaryText={phone} />
                        <ListItem primaryText="Designation" secondaryText={designation} />
                      </List>
                      <br />

                      <Button variant="contained" color="secondary" className={classes.button} onClick={this.back}
                        style={{ backgroundColor: '#fdba15', color: '#4b3d78', marginRight: '20px' }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" className={classes.button} onClick={handleSubmitForm}
                        style={{ backgroundColor: '#fdba15', color: '#4b3d78' }}>
                        Confirm
                      </Button>
                    </React.Fragment>
                  </center>
                </MuiThemeProvider>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </div>
        </div>
        <div id='footer3'>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirm)

