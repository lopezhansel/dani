import React from 'react';
import Logo from './Logo';
import {Link} from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
      	<div className=" text-center info">
      		<p className="name">Daniel Noriega</p>
      		<p className="title">Arquitecto</p>
      		<div className="btn">
      			<Link onClick={this.onClick} to={'/about'}>
							About
							<svg> 
								<defs>
									<linearGradient id='grad'>
										<stop stopColor='#0fb8ad'/>
										<stop offset='51%' stopColor='#1fc8db'/>
										<stop offset='75%' stopColor='#2cb5e8'/>
									</linearGradient>
								</defs>
								<rect x="0" y="0" fill="none" width="166" height="45" /> 
							</svg>
						</Link>
      		</div>
      	</div>
      </div>
    );
  }
}

export default Home;