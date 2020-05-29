import React from 'react'
import axios from '../../../config/axios'
import EmployeeForm from './employeeForm'
import { Redirect } from 'react-router-dom'
import NavBar from './navBar'

class NewEmployee extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post('/wantToMeet', formData)
            .then(() => this.props.history.push("/admin/employee_list"))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <div>
                <NavBar />
                {this.props.isAuthenticated ?
                    <div style={{ marginTop: '50px' }}>
                        <h3 style={{ fontFamily: 'Sans-serif', color: '#4b3d78' }}><center>Add Employee</center>  </h3><br />
                        <EmployeeForm handleSubmit={this.handleSubmit} />
                    </div> : <Redirect to="/admin/signin" />
                }

            </div>
        )
    }
}

export default NewEmployee