import React from 'react';
import NavBar from './navBar'
import axios from '../../../config/axios'
import { Redirect, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid, Container, Fab } from '@material-ui/core'
import Add from '@material-ui/icons/Add';


const styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    fab: {
        margin: theme.spacing(1),
    },
    card: {
        maxWidth: 180,
        boxShadow: 'none'

    },
    media: {
        height: 160,
    },
    name: {
        fontSize: "40px",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "sans-serif",
        marginBottom: "40px"
    }
});

class EmployeeTable extends React.Component {
    constructor() {
        super()
        this.state = {
            employees: []

        }
    }
    componentDidMount() {
        axios.get('/wantToMeet')
            .then(response => this.setState(() => ({ employees: response.data })))
            .catch(err => { return err })
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.isAuthenticated ?
                    <div id="root1">
                        <NavBar />
                        <div style={{ marginTop: '40px' }}>
                            <Container fixed >
                                <Typography gutterBottom className={classes.name}>
                                    TechJunkies of Code Army
                                    <span style={{ float: 'right' }}>
                                        <Link to='/admin/new_employee'>
                                            <Fab size='small' color="primary" aria-label="add" className={classes.fab}
                                                style={{ marginRight: '20px', backgroundColor: '#4b3d78', border: 'none', outline: 'none', color: 'white', }}>
                                                <Add className={classes.extendedIcon} />

                                            </Fab>
                                        </Link></span>
                                </Typography>
                                <Grid container spacing={5}>
                                    {
                                        this.state.employees.map(employee => {
                                            return (
                                                <Grid item lg={3} md={3} sm={4} xs={12} key={employee._id}>
                                                    <center>
                                                        <Link to={`/admin/employee/${employee._id}`} style={{ textDecoration: 'none' }} >
                                                            <Card className={classes.card} id="card" >
                                                                <CardActionArea>
                                                                    <CardMedia
                                                                        className={classes.media}
                                                                        image={employee.image}
                                                                        title={employee.name}
                                                                    />
                                                                    <CardContent>
                                                                        <Typography gutterBottom variant="h6" component="h3" style={{ color: '#4b3d78' }}>
                                                                            {employee.name}
                                                                        </Typography>
                                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                                            {employee.designation}
                                                                        </Typography>
                                                                    </CardContent>
                                                                </CardActionArea>

                                                            </Card>
                                                        </Link>
                                                    </center>
                                                </Grid>

                                            )
                                        })
                                    }
                                </Grid>
                            </Container>
                        </div>
                    </div> : <Redirect to="/admin/signin" />
                }

            </div>
        );

    }
}

EmployeeTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeTable)



