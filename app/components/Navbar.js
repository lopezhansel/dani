import React,{Component} from 'react';
import {Link} from 'react-router';
import Logo from './Logo';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    setTimeout(letjQueryLoad => {
      this.$inky = $('.inky');
      this.$rightMenu = $('#nav');
      this.$oldActiveItem = this.$rightMenu.find('.active');
      this.$inky.css({ left: this.$oldActiveItem.offset().left, width: this.$oldActiveItem.width(), display:'none' });
    }, 200);
  }
  
  onClick(ev) {
    let newActiveItem = ev.currentTarget;
    let {$inky,$rightMenu,$oldActiveItem} = this;
    
    $oldActiveItem.removeClass('active');
    $inky.css({ display: 'block' }).after(a=> $inky.css({ left: newActiveItem.offsetLeft, width: newActiveItem.clientWidth }));
    setTimeout(letTransitionFinish => {
      this.$oldActiveItem = $rightMenu.find(newActiveItem).addClass('active');
      $inky.css({ display: 'none' });
    }, 300);
  }
  render() {
    return (
      <nav id="navbar" className="ui ui  large secondary network menu inverted fixed">
        <div className="ui container">
          <div id="nav" className="ui large secondary network menu inverted fluid pointing">
            {<Link onClick={this.onClick} className="ui item" to={'/'}>
              <Logo  ></Logo>
            </Link>}
            <div className="right menu">
              <div className="inky"></div>
              <Link onClick={this.onClick} className="ui item" to={'/'}>Home</Link>
              <Link onClick={this.onClick} className="ui item active" to={'/about'}>About</Link>
              <a onClick={this.onClick} className="ui item">Work</a>
              <a onClick={this.onClick} className="ui item">Contact</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
