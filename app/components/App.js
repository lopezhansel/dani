import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Trans from 'react-addons-css-transition-group';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
	    	<Trans  transitionAppear={true} 
	    		transitionName={{enter: 'animated', enterActive: 'fadeIn', leave: 'animated', leaveActive: 'none', appear: 'animated', appearActive: 'pulse'}}
	    		transitionEnterTimeout={1000} transitionLeaveTimeout={1} transitionAppearTimeout={1000} >
		        {React.cloneElement(this.props.children, {
	            key: this.props.location.pathname
	          })}
	        </Trans>
        <Footer />
      </div>
    );
  }
}

export default App;