import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div className="hero">
      	<div className=" text-center info">
      		<p className="name">Daniel Noriega</p>
      		<p className="title">Arquitecto</p>
      		<div className="btn">
      			<svg> <rect x="0" y="0" fill="none" width="166" height="45" /> </svg>
      			<a href="#about">More Info ></a>
      		</div>
      	</div>
      </div>
    );
  }
}

export default Home;