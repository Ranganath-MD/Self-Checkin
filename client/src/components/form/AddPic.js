import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Webcam from "react-webcam";
import logo from '../../Assets/logo.png'
const styles = theme => ({
  input: {
    margin: theme.spacing(2),
  },
  text: {
    marginTop: "50px"
  },
  submit: {
    marginTop: "40px",
    marginBottom: "40px"
  },
  back: {
    width: "100px"
  }
});


class AddPic extends Component {
  constructor() {
    super()
    this.state = {
      msg: '',
      webcamEnabled: true,
      hidebtn: false,
    }
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const image = this.webcam && this.webcam.getScreenshot();
    // console.log(image)
    localStorage.setItem("image", image);
    this.setState(() => ({ msg: "You looking nice today!", webcamEnabled: false, hidebtn: true }))
    // this.props.values.image = image
    // this.setState(() => ({ formData : this.props.values}))
  };
  continue = e => {
    e.preventDefault();
    if (localStorage.getItem('image') == null) {
      this.setState(() => ({
        msg: "Take a pic"
      }))
    } else {
      this.props.nextStep();
    }
  };

  back = e => {
    e.preventDefault();
    localStorage.clear()
    this.props.prevStep();
  };
  render() {
    const { classes } = this.props;
    const { values } = this.props;
    const constraints = {
      facingMode : "user"
    }
    return (
      <div >
        <center>
          <img src={logo} alt='mverve' style={{ paddingTop: '20px', width: '180px', height: '65px' }}></img>
        </center>
        <div className={classes.form} >
          <div className="container" style={{ marginTop: '60px' }}>
            <center>

              <Grid >
                <Grid item xs={1} sm={1} md={1} lg={1}>
                </Grid>
                <Grid item xs={10} sm={10} md={8} lg={10}>
                  <h5 style={{ color: '#4b3d78', fontStyle: 'sans-serif' }}>Take a Photo for yourself for your Visitor to see you!</h5>
                  <div style={{ paddingTop: '20px' }}>
                    {this.state.webcamEnabled ? (
                      <Webcam
                        audio={false}
                        height='auto'
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        width="330px"
                        videoConstraints={constraints}
                      />

                    ) : (
                        <img src={localStorage.getItem('image')} alt='pic' />

                      )}
                    <br></br>
                    <p style={{ color: "#4b3d78" }}>{this.state.msg}  </p>
                    {
                      !this.state.hidebtn &&
                      <Button variant="contained" color="secondary" className={classes.button}
                        defaultValue={values.image} onClick={this.capture}
                        style={{ backgroundColor: '#fdba15', color: '#4b3d78', marginRight: '20px' }}>
                        Capture photo
                      </Button>
                    }

                  </div><br></br>
                  <div>

                    <Button variant="contained" color="secondary" className={classes.back} onClick={this.back}
                      style={{ backgroundColor: '#fdba15', color: '#4b3d78', marginRight: '30px' }}>
                      Back
                </Button>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.continue}
                      style={{ backgroundColor: '#fdba15', color: '#4b3d78' }}>
                      Continue
                </Button>

                  </div>

                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
              </Grid>
            </center>
          </div>
        </div>
        <div id='footer2'>
        </div>
      </div>
    );
  }
}

AddPic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPic)


