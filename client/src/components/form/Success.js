import React from 'react';
import send from "../../Assets/sendEmail.gif"
class Success extends React.Component {

  componentWillMount() {
    setTimeout(() => {
      this.props.history.push('/');
    }, 7000)
  }
  render() {
    return (
      <div align="center" style={{ paddingTop: "10em" }}>
        <h1>Thank You For Checking - In</h1>
        <img src={send} alt="sending an email" width="auto" height="400px"/>
      </div>
    );
  }

}

export default Success;
