import React from 'react';
import {Link} from 'react-router';
import Logo from './Logo';
class Navbar extends React.Component {
  render() {
    return (
      <div className=" top-bar">
        <div className="wrapper">
          <div className="top-bar-left">
            <ul className="menu">
              <li ></li>
              <Link to={'/'}>
                <Logo ></Logo>
              </Link>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li >
              <Link to={'/about'}>About</Link>
              </li>
              <li ><a href="#work">Work</a></li>
              <li ><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
