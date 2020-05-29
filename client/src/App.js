import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Page from './components/button'
import UserForm from './components/form/UserForm'
import Success from './components/form/Success'
import Signup from './components/Admin/authenticate/register'
import SignIn from './components/Admin/authenticate/login'
import AdminLogout from "./components/Admin/authenticate/logout"
import Home from './components/Admin/dashboard/home'
import EmployeeTable from './components/Admin/dashboard/employeeTable';
import NewEmployee from "./components/Admin/dashboard/newEmployee";
import EmployeeShow from "./components/Admin/dashboard/employeeShow"
import EditEmployee from "./components/Admin/dashboard/editEmployee"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: !!localStorage.getItem('token')
    }
  }

  handleIsAuthenticated = (bool) => {
    this.setState(() => ({
      isAuthenticated: bool
    }))
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Page} exact={true} />
          <Route path="/register" component={UserForm} exact={true} />
          <Route path="/success" component={Success} exact={true} />
          <Route path="/admin/new_employee" render={(props) => <NewEmployee {...props} isAuthenticated={this.state.isAuthenticated} />} exact />
          <Route path="/admin/employee/:id" component={EmployeeShow} exact={true} />
          <Route path="/admin/edit/:id" component={EditEmployee} exact={true} />
          <Route path="/admin/signup" component={Signup} exact={true} />
          <Route path="/admin/logout" render={props => <AdminLogout {...props} handleIsAuthenticated={this.handleIsAuthenticated} />} />
          <Route path="/admin/dashboard" render={() => <Home isAuthenticated={this.state.isAuthenticated} />} />
          <Route path="/admin/employee_list" render={() => <EmployeeTable isAuthenticated={this.state.isAuthenticated} />} />
          <Route path='/admin/signin' render={() => <SignIn handleIsAuthenticated={this.handleIsAuthenticated} />} />
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
