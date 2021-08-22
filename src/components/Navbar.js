import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top color-nav flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://tkt.thuiskapper.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://cdn.thuiskapper.app/logos/logo-thuiskapper.png" height="40px" alt="ThuisKapper logo"></img>
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
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
