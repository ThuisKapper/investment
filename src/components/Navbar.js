import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar h-14 fixed-top color-nav shadow flex">
        <a
          className="m-0 p-0 flex-1"
          href="https://tkt.thuiskapper.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://cdn.thuiskapper.app/logos/logo-thuiskapper.png" className="w-48" height="40px" width="120px" alt="ThuisKapper logo"></img>
        </a>
        <ul className="navbar-nav flex-1">
          <li className="nav-item w-70 text-left text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>

          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
