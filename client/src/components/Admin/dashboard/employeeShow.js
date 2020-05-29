import React from 'react'
import axios from '../../../config/axios'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Row, Modal, Button } from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import NavBar from './navBar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';


const styles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '20px'
    },

    heading: {
        fontWeight: theme.typography.fontWeightRegular,

    },
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
class EmployeeShow extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            employee: {},
            show: false,
            visitors: [],
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/wantToMeet/${id}`)
            .then(response => this.setState(() => ({ employee: response.data, visitors: response.data.visitors })))
    }

    handleDelete() {
        axios.delete(`/wantToMeet/${this.state.employee._id}`)
            .then(() => this.props.history.push('/admin/employee_list'))
            .catch(err => (err))
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavBar />

                <div className="container" style={{ paddingTop: '40px' }}>

                    <div className="row">


                        <div className="col xs={12} sm={12} md={12} lg={12} ">
                            <hr></hr>
                            <Row>
                                <div className="col xs={12} sm={12} md={6} lg={6}">
                                    <center><img src={this.state.employee.image} alt={this.state.employee.name} width='250px' height="250px" /></center>
                                </div>

                                <div className="col xs={12} sm={12} md={6} lg={6}" style={{ paddingTop: "0px" }}>
                                    <h1 style={{ color: '#4b3d78' }}> <b>{this.state.employee.name}</b>
                                        <span style={{ float: 'right' }}>

                                            <Modal show={this.state.show} onHide={this.handleClose} style={{ marginTop: "200px" }}>
                                                <Modal.Header style={{ backgroundColor: "#4b3d78" }}>
                                                    <Modal.Title style={{ backgroundColor: "#4b3d78", color: 'white' }}>Delete </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Are you Sure, you want to delete?</Modal.Body>
                                                <Modal.Footer>
                                                    <Button style={{ backgroundColor: "#4b3d78", color: 'white' }} onClick={this.handleDelete}>
                                                        Yes
                                                    </Button>
                                                    <Button style={{ backgroundColor: "#4b3d78", color: 'white' }} onClick={this.handleClose}>
                                                        No
                                                    </Button>

                                                </Modal.Footer>
                                            </Modal>
                                        </span>
                                    </h1>
                                    <Row>

                                    </Row>

                                    <span style={{ fontfamily: "sans-serif", color: '#666666', fontsize: "10px" }}>{this.state.employee.email}<br></br></span>
                                    <span style={{ fontfamily: "sans-serif", color: '#666666', fontsize: "10px", }}>{this.state.employee.designation}<br></br></span>
                                    {/* <h5 style={{fontfamily:  "sans-serif"}}> <b> Description </b> : {this.state.employee.notes}<br></br> </h5>  */}

                                    <br></br>
                                    <br></br>
                                </div>
                            </Row>
                            <span style={{ float: 'right' }}>

                                <Link to={`/admin/edit/${this.state.employee._id}`}><Fab variant="extended" aria-label="Delete" className={classes.fab}
                                    style={{ marginRight: '20px', backgroundColor: '#4b3d78', color: 'white', }}>
                                    <Edit className={classes.extendedIcon} />
                                    edit
                                </Fab></Link>
                                <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={this.handleShow}
                                    style={{ backgroundColor: '#4b3d78', color: 'white', }}>
                                    <Delete className={classes.extendedIcon} />
                                    Delete
                                </Fab>

                            </span>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={classes.root}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading} style={{ color: '#4b3d78', fontSize: "20px" }}>Visitors Detail</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className="table-responsive-sm table-responsive-md table-responsive-lg">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th> Name</th>
                                                <th> Company</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.visitors.map(visitor => {
                                                return (
                                                    <tr key={visitor._id} value={visitor._id} >
                                                        <td> {visitor.name}</td>
                                                        <td> {visitor.company}</td>
                                                        <td> {visitor.email}</td>
                                                        <td> {visitor.phone}</td>
                                                        <td> {visitor.visitedAt && visitor.visitedAt.slice(0, 10)}</td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>

                                </div>

                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                    </div>
                </div >
            </div >
        )
    }
}
EmployeeShow.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(EmployeeShow)
