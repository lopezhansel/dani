import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {

  render() {

    return (
      <footer>
        <div className="footer-wrapper">
          <ul>
            <li>About</li>
            <li>Work</li>
            <li>Contact</li>
          </ul>
          <ul>
            <li>Design and Built By Hansel Lopez</li>
            <li>Copyright Daniel Noriega 2016 </li>
            <li>Daniel Noriega © 2016 // Monterey , Mexico // miles@milestsang.com</li>
          </ul>
          <ul>
            <li>Pinterest</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Email</li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;