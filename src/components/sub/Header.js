import React, { Component } from 'react';
import '../../styles/components/sub/header.css'
class Header extends Component {
  render() {
    return (
        <div>
          <ul className="Header__menu">
            <li className="Header__menu-item">Data Peace</li>
          </ul>
        </div>
    );
  }
}

export default Header;
