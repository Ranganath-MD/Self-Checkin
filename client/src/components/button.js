import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import Tooltip from '@material-ui/core/Tooltip';


const Page = () => {
  return (
    <div className="body-img">
      <div className="nav">
        <img src={logo} alt='Code Army' id="logo" style={{ paddingTop: '20px' }} />
        <Tooltip title="Admin login">
          <h5 style={{ paddingTop: '35px', float: 'right', fontFamily: 'Georgia', fontSize: '25px' }} alt="adminlogin">
            <Link to="/admin/signin" style={{ textDecoration: "none", color: '#4b3d78' }}>Admin</Link>
          </h5>
        </Tooltip>
      </div>
      <div className="content">
        <span >
          <h3>Welcome to Code Army</h3>
        </span>
        <Button variant="contained" color="primary" >
          <Link to='/register' style={{ color: 'white' }}  > Tap To Sign In ></Link>
        </Button>
      </div>
    </div>
  )
}
export default Page;
