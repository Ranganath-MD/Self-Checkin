import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from '../../config/axios'
import logo from '../../Assets/logo.png'

const styles = theme => ({
  input: {
    margin: theme.spacing(2),
  },
  text: {
    marginTop: "50px"
  },
  form: {
    marginTop: "70px"
  },
  button: {
    marginTop: '20px',
    width: '180px'
  }
});

class FormPersonalDetails extends Component {
  constructor() {
    super()
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    axios.get('/wantToMeet')
      .then(response => this.setState(() => ({
        options: response.data
      })))
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };


  render() {

    const { values, handleChange1 } = this.props
    const { classes } = this.props;
    return (
      <div >
        <center>
          <img src={logo} alt='mverve' style={{ paddingTop: '20px', width: '180px', height: '65px' }}></img>
        </center>
        <div className={classes.form} >
          <div className="container" style={{ marginTop: '120px' }}>

            <Grid container spacing={0}>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={8}>

                <React.Fragment>
                  <center>
                    <h4 style={{ color: '#4b3d78', fontStyle: 'sans-serif' }}>Whom do you want to meet ? </h4> <br></br>
                    <form className={classes.container} onSubmit={this.continue} >
                      <FormControl className={classes.formControl} required >
                        <InputLabel htmlFor="age-native-simple">Meet</InputLabel>
                        <Select
                          native
                          defaultValue={values.meet}
                          onChange={handleChange1('meet')}
                          style={{ width: '350px' }}
                        >
                          <option value="" />
                          {
                            this.state.options.map(option => {
                              return (
                                <option key={option._id} value={option._id}> {option.name}, {option.designation} </option>
                              )
                            })
                          }
                        </Select>
                      </FormControl>

                      <br />
                      <br />
                      <div>

                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.back}
                          style={{ backgroundColor: '#fdba15', color: '#4b3d78', marginRight: '20px' }}>
                          Back
                    </Button>
                        <Button type='submit' variant="contained" color="secondary" className={classes.button}
                          style={{ backgroundColor: '#fdba15', color: '#4b3d78' }}>
                          Continue
                    </Button>


                      </div>
                    </form>
                  </center>
                </React.Fragment>

              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </div>
        </div>
        <div id='footer1'>
        </div>
      </div>
    );
  }
}

FormPersonalDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormPersonalDetails)
