import React,{Component} from 'react';
import {Link} from 'react-router';
import Logo from './Logo';

const Hello = ()=>{
  return (
      <Link className="ui item active" to={'/hello'}>Hello</Link>
    )
}
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
    
    $oldActiveItem.removeClass('active navFlip');
    $inky.css({ display: 'block' }).after(a=> $inky.css({ left: newActiveItem.offsetLeft, width: newActiveItem.clientWidth }));
    setTimeout(letTransitionFinish => {
      
      this.$oldActiveItem = $rightMenu.find(newActiveItem).addClass('active');
      if (!(this.$oldActiveItem[0].id === 'logo')){
        this.$oldActiveItem.addClass('navFlip');
      }
      $inky.css({ display: 'none' });
    }, 300);
  }
  render() {
    return (
      <nav id="navbar" className="ui ui  large secondary network menu inverted fixed">
        <div className="ui container">
          <div id="nav" className="ui large secondary network menu inverted fluid pointing">
            <div className="ui item" id='logo'onClick={this.onClick}><Logo  ></Logo></div>
            <div className="right menu">
              <div className="inky"></div>
              
                <Link className="ui item" onClick={this.onClick} to={'/'}>
              <div>
                  Home
              </div>
                </Link>
              
                <Link to={'/about'} className="ui item" onClick={this.onClick}>
                  <div>
                      About
                  </div>
                </Link>
              
                <a className="ui item" onClick={this.onClick}>
              <div>
                  Work
              </div>
                </a>
              
                <a className="ui item" onClick={this.onClick}>
              <div>
                  Contact
              </div>
                </a>
              
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
