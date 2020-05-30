import React, { Component } from 'react'
import MaterialTable from 'material-table';
import NavBar from './navBar'
import Delete from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid'
import axios from '../../../config/axios'

import { Redirect } from 'react-router-dom'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Email', field: 'email' },
                { title: 'Company', field: 'company' },
                { title: 'Phone No', field: 'phone' },
                { title: 'Wants to meet', field: 'meet.name' },

            ],
            data: [],
            show: false,

        }
    }
    handleShow = () => {
        this.setState(() => ({ show: true }))
    }

    handleClose = () => {
        this.setState(() => ({ show: false }))

    }

    handleDelete = (event, rowData) => {
        const id = rowData._id
        const confirm = window.confirm("Are you sure ?", rowData.name)
        if (confirm) {
            axios.delete(`/visitors/${id}`)
                .then(() =>
                    window.alert("successfully deleted"),
                    this.getVisitor()
                )
                .catch(err => window.alert(err))
        }
    }
    getVisitor = () => {
        axios.get('/visitors')
            .then(response => this.setState(() => ({ data: response.data })))
            .catch(err => { return err })
    }

    componentDidMount() {
        this.getVisitor()
    }
    render() {
        return (
            <div>
                {this.props.isAuthenticated ?
                    <div>
                        <NavBar />
                        <div style={{ marginTop: '40px', marginRight: '40px', marginLeft: '40px' }}>
                            <Grid container>
                                <Grid item lg={3} md={3}  ></Grid>
                                <Grid item xs={12} lg={12} md={12} sm={12} >
                                    <MaterialTable
                                        title="Visitors Table"
                                        columns={this.state.columns}
                                        data={this.state.data}
                                        actions={[
                                            {
                                                icon: "delete",
                                                tooltip: 'Delete User',
                                                onClick: this.handleDelete
                                            }
                                        ]}
                                        options={{
                                            actionsColumnIndex: -1
                                        }}
                                    />
                                </Grid>
                            </Grid>


                        </div>
                    </div> : <Redirect to="/admin/signin" />
                }

            </div>
        )
    }
}

export default Home




