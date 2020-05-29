import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormControl, InputLabel, Input, Button, CssBaseline } from '@material-ui/core'
import { Grid, Typography, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../../Assets/logo3.png'
import axios from "../../../config/axios"



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
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        fontWeight: "bold",
    },
    msg: {
        fontWeight: "bold",
        marginTop: "20px",
        color: "#1a237e",
    }
});

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            msg: "",
            redirect: false

        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = this.state
        axios.post('/admin/register', formData)
            .then(response => {
                if (response.data.redirect) {
                    this.setState({ msg: response.data.message, redirect: true})
                } else {
                    this.setState({ msg: response.data.message })
                }
            })
            .catch(err => { return err })
        this.setState(() => ({
            username: '',
            email: '',
            password: ''
        }))
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    render() {
        const { classes } = this.props
        if (this.state.redirect) {
            return <Redirect to="/admin/signin" />
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <center>
                        <img src={logo} alt='mverve' style={{ width: '180px', height: '65px', marginBottom: "20px" }}></img>
                    </center>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <div className={classes.msg} >
                        <h6>{this.state.msg}</h6>
                    </div>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <FormControl margin="normal" required fullWidth >
                                    <InputLabel >Name</InputLabel>
                                    <Input type="text" value={this.state.username} onChange={this.handleChange}
                                        name="username" placeholder="Enter your name" />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl margin="normal" required fullWidth >
                                    <InputLabel >Email</InputLabel>
                                    <Input type="email" value={this.state.email} onChange={this.handleChange}
                                        name="email" placeholder="Enter your email" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel >Password</InputLabel>
                                    <Input type="password" value={this.state.password} onChange={this.handleChange}
                                        name="password" placeholder="Enter your Password" />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            style={{ color: '#4b3d78', backgroundColor: "#fdba15" }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to='/admin/signin'>
                                    Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignUp)