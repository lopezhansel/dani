import React, {Component} from 'react';
import {Link} from 'react-router';
import Logo from './Logo';
import classNames from 'classnames';

const MenuItems = (props) => {
  // STATE IS HARD CODED REMOVE LATER
  var menuItems = [
    { title: 'Home', link: "" },
    { title: 'About', link: "about" },
    { title: 'Work', link: "work" },
    { title: 'Contact', link: "contact" }
  ];
  return (
    <div className='right menu'>
      <div className="inky"></div>
      {menuItems.map((el, id) => (
        <Link key={id} className={classNames('ui', 'item', { active: el.link === props.path }) } onClick={props.onClick} to={'/' + el.link}>
          <div>
            {el.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    setTimeout(letjQueryLoad => {
      this.$inky = $('.inky');
      this.$rightMenu = $('#nav');
      // No longer Needed
      this.$oldActiveItem = this.$rightMenu.find('.active');
      this.$inky.css({ left: this.$oldActiveItem.offset().left, width: this.$oldActiveItem.width(), display: 'none' });
    }, 500);
  }
  onClick(ev) {
    let newActiveItem = ev.currentTarget;
    let {$inky, $rightMenu, $oldActiveItem} = this;
    $oldActiveItem.removeClass('active navFlip');
    $inky.css({ display: 'block' }).after(a => $inky.css({ left: newActiveItem.offsetLeft, width: newActiveItem.clientWidth }));
    setTimeout(letTransitionFinish => {
      this.$oldActiveItem = $rightMenu.find(newActiveItem).addClass('active');
      if (!(this.$oldActiveItem[0].id === 'logo')) {
        this.$oldActiveItem.addClass('navFlip');
      }
      $inky.css({ display: 'none' });
    }, 300);
  }
  render() {
    let location = this.props.location.pathname.substring(1, this.length);
    return (
      <nav id="navbar" className="ui ui  large secondary network menu inverted fixed">
        <div className="ui container">
          <div id="nav" className="ui large secondary network menu inverted fluid pointing">
            <div className="ui item" id='logo'onClick={this.onClick}><Logo  ></Logo></div>
            <MenuItems onClick={this.onClick} path={location}/>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
// <Link className="ui item" onClick={this.onClick} to={'/'}>
//   <div>
//     Home
//   </div>
// </Link>
// <Link to={'/about'} className="ui item" onClick={this.onClick}>
//   <div>
//     About
//   </div>
// </Link>
// <a className="ui item" onClick={this.onClick}>
//   <div>
//     Work
//   </div>
// </a>
// <a className="ui item" onClick={this.onClick}>
//   <div>
//     Contact
//   </div>
// </a>