import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';
import AddPic from './AddPic'
import axios from '../../config/axios'


class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      step: 1,
      name: '',
      company: '',
      email: '',
      phone: '',
      meet: '',
      designation : ""
    }
  }

  handleSubmitForm = (e) => {
    e.preventDefault()
    const formData = {
      name: this.state.name,
      company: this.state.company,
      email: this.state.email,
      phone: this.state.phone,
      meet: this.state.meet,
      designation: this.state.designation,
      image: localStorage.getItem('image')
    }
    axios.post('/visitors', formData)
      .then(() => this.props.history.push('/success'))
      .catch(err => console.log(err))
      localStorage.clear()
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };
  prevStep1 = () => {
    const { step } = this.state;
    this.setState({
      step: step - 3
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };


  handleChange1 = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { name, company, email, phone, meet, image, designation } = this.state;
    const values = { name, company, email, phone, meet, image, designation };
    switch (step) {
      case 1:
        return (

          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange1={this.handleChange1}
            values={values}
          />
        );
      case 3:
        return (
          <AddPic
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep1={this.prevStep1}
            values={values}
            handleSubmitForm={this.handleSubmitForm}
          />
        );
      case 5:
        return <Success />
      default:
        return (<div/>)
    }
  }
}

export default UserForm;
