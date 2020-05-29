import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Input, Grid, Button, FormControl, InputLabel } from '@material-ui/core';

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
    }
});


class EmployeeForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            designation: "",
            image: null
        }
    }

    //gettign an input value and set the state with that value
    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleFileChange = (e) =>  {
        e.persist()
        this.setState(() => ({
            image: e.target.files[0]
        }))
    }


    //getting a value from dropdown menu
    handleSelect = (e) => {
        const genre = e.target.value
        this.setState(() => ({ genre }))
    }

    // We have the Employee data in the parent component (EditEmployee), then we want to set the state in the child component(EmployeeForm)
    //To set the state in the child component, we use componentWillReceiveProps()
    componentWillReceiveProps(nextProps) {
        const { name, email, designation, image } = nextProps.employee
        this.setState(() => ({
            name, email, designation, image
        }))
    }

    handleSubmit = (e) => {
        // e.preventDefault() is to prevent the default behaviour of the browser,
        //that means the browser will not refresh on submit the form
        e.preventDefault()
        var formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('designation', this.state.designation)
        formData.append("image", this.state.image, this.state.image.name)
        this.props.handleSubmit(formData)
        this.setState(() => ({
            name: '', email: '', designation: '', image: null
        }))
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <form onSubmit={this.handleSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel >Employee name</InputLabel>
                                <Input type="text" className={classes.input} value={this.state.name} onChange={this.handleChange} name="name" placeholder="Employee name" />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <InputLabel >email</InputLabel>
                                <Input type="text" className={classes.input} value={this.state.email} onChange={this.handleChange} name="email" placeholder="email" />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <InputLabel >Designation</InputLabel>
                                <Input type="text" className={classes.input} value={this.state.designation || ''} onChange={this.handleChange} name="designation" placeholder="Designation" />
                            </FormControl>
                            <input type='file' name='image' onChange={this.handleFileChange} required/>
                            <br />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: '#4b3d78', border: 'none', outline: 'none', color: 'white', }}
                                className={classes.submit}
                            >
                                Submit
                                </Button>
                        </form>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </div>
        )
    }
}
EmployeeForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeForm)