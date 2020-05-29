import React from 'react'
import axios from '../../../config/axios'
import EmployeeForm from './employeeForm'
import NavBar from './navBar'


class EditEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: {},
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/wantToMeet/${id}`)
            .then(response => this.setState(() => ({ employee: response.data })))
    }

    handleSubmit(formData) {
        axios.put(`/wantToMeet/${this.state.employee._id}`, formData)
            .then(() => this.props.history.push(`/admin/employee_list`))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <NavBar />
                <div style={{ paddingTop: '70px' }}>

                    <EmployeeForm
                        employee={this.state.employee}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            </div>
        )
    }
}

export default EditEmployee