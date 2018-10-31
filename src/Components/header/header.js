import React from 'react';
import './header.css';
import { Menu, Dropdown, Icon } from 'antd';
import firebase from '../../firebase.js';

//const userName=localStorage.getItem('userName');
const auth= firebase.auth();

export default function Header(props){
  const menu = (
    <Menu>
      <Menu.Item>
      <p onClick={()=>{props.LogOut(auth.currentUser.displayName)}}>
        Logout <Icon type="logout" theme="outlined" style={{ fontSize: '1.2em' }} /> 
      </p>
      </Menu.Item>
    </Menu>
  );
  //const userName=localStorage.getItem('userName');
  return(
    <nav>
      <span className='brand' onClick={props.getHome}>
        Panacloud
      </span>
      <span className='user'>
        { auth.currentUser? 
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link">
            <Icon type="user" theme="outlined" style={{ color:'black' ,fontSize: '1.5em' }} />
            {auth.currentUser.displayName} 
          </a>
        </Dropdown>
        :
        <Icon type="login" theme="outlined" style={{ color:'black' ,fontSize: '1.5em' }} /> }
      </span> 
    </nav>
  )
}
