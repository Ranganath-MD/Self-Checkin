import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel, Input } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import logo from '../../../Assets/logo3.png'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from "../../../config/axios"
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    msg : {
        fontWeight : "bold",
        marginTop : "20px",
        color : "#1a237e",
    }
});


class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            isChecked: false,
            msg : "",
            redirect : false
        }
    }

   handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        axios.post('/admin/login', formData)
            .then((response) => {
                axios.defaults.headers['x-auth'] = response.data
                localStorage.setItem('token', response.data.token)
                    this.props.handleIsAuthenticated(true)
                    this.setState(() =>({ redirect : true }))
                }
            )
            .catch(err => {
                this.setState(() => ({
                    msg : err.response.data.notice
                }))
            })

        this.setState(() => ({
            email: '',
            password : ""
        }))
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    handleCheck = (e) => {
        const isChecked = e.target.checked
        this.setState(() => ({ isChecked }))
    }

    render() {
        const { classes } = this.props
        if(this.state.redirect) {
            return <Redirect to="/admin/dashboard" />
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <center>
                        <img src={logo} alt='mverve' style={{ width: '180px', height: '65px', marginBottom: "20px" }}></img>
                    </center>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div className={classes.msg} >
                        <h6>{this.state.msg}</h6>
                    </div>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth >
                            <InputLabel >Email</InputLabel>
                            <Input type="email" value={this.state.email} onChange={this.handleChange}
                                name="email" placeholder="Enter your email" />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel >Password</InputLabel>
                            <Input type={this.state.isChecked ? "text" : "password"} value={this.state.password} onChange={this.handleChange}
                                name="password" placeholder="Enter your Password" />
                        </FormControl>


                        <FormControlLabel
                            control={<Checkbox value={this.state.isChecked} color="primary" />}
                            label="Show Password"
                            onChange={this.handleCheck}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{ color: '#4b3d78', backgroundColor: "#fdba15" }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link to='/admin/signup'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}
SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignIn)