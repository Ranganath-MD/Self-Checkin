import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import logo from '../../Assets/logo.png'


const styles = theme => ({
  input: {
    margin: theme.spacing(2),
  },
  text: {
    marginTop: "50px"
  },
  form: {
    marginTop: "50px"
  },
  button: {
    marginTop: '20px',
    width: '180px'
  }
});


class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const { classes } = this.props;

    return (
      <div >
        <center>
          <img src={logo} alt='mverve' style={{ paddingTop: '20px', width: '180px', height: '65px' }}></img>
        </center>
        <div className={classes.form} >
          <div className='container'>
            <center>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                  <MuiThemeProvider>
                    <React.Fragment>
                      <h3 style={{ color: '#4b3d78', fontStyle: 'sans-serif' }}>Enter Visitor Details </h3>
                      <form className={classes.container} onSubmit={this.continue} >
                        <FormControl margin="normal" required fullWidth>
                          <InputLabel >Name</InputLabel>
                          <Input type="text" className={classes.input} onChange={handleChange('name')}
                            defaultValue={values.name} name="name" placeholder="Enter your name" />
                        </FormControl>

                        <br />
                        <FormControl margin="normal" required fullWidth>
                          <InputLabel >Company</InputLabel>
                          <Input type="text" className={classes.input} onChange={handleChange('company')}
                            defaultValue={values.company} name="company" placeholder="Enter Your Company" />
                        </FormControl>

                        <br />
                        <FormControl margin="normal" required fullWidth>
                          <InputLabel >Email</InputLabel>
                          <Input type="email" className={classes.input} onChange={handleChange('email')}
                            defaultValue={values.email} name="email" placeholder="Enter Your Email" />
                        </FormControl>

                        <br />
                        <FormControl margin="normal" required fullWidth>
                          <InputLabel >Phone No</InputLabel>
                          <Input type="text" className={classes.input} onChange={handleChange('phone')}
                            defaultValue={values.phone} name="phone" placeholder="Enter Your Phone No" />
                        </FormControl>

                        <FormControl margin="normal" fullWidth>
                          <InputLabel >Designation</InputLabel>
                          <Input type="text" className={classes.input} onChange={handleChange('designation')}
                            defaultValue={values.designation} name="designation" placeholder="Enter your designation" />
                        </FormControl>

                        <br></br>
                        <Button type='submit' variant="contained" color="secondary" className={classes.button} style={{ backgroundColor: '#fdba15', color: '#4b3d78' }}>
                          Continue
                        </Button>

                      </form>
                    </React.Fragment>
                  </MuiThemeProvider>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>

            </center>
          </div>
        </div>
        <div id='footer'>
        </div>
      </div>

    );
  }
}

FormUserDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormUserDetails)



