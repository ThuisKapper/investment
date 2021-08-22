import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { BrowserRouter as Router, NavLink } from "react-router-dom";

export default props => {
  return (
    <Menu>
      <a id="home_logo" href="https://tkt.thuiskapper.app/" title="ThuisKapper">
        <img src="https://cdn.thuiskapper.app/images/thuiskapper-groen-logo.png" height="37px" width="180px" alt="ThuisKapper logo groen" />
      </a>
      <Router>
        <NavLink exact activeClassName="active" to ="/">  <i class="fas fa-scroll"></i> Whitepaper</NavLink>
        <a target="_blank" rel="noopener noreferrer" href="https://www.thuiskapper.app"><i class="fas fa-atom"></i> Our Platform</a>
        <a target="_blank" href="https://www.thuiskapper.app/aanmelden/" rel="noopener noreferrer">  <i class="fas fa-cut"></i> Cut clients for us</a>
        <a target="_blank" href="https://www.thuiskapper.app/aanmelden/" rel="noopener noreferrer"><i class="fas fa-sign-in-alt"></i> Book a barber</a>
        <a target="_blank" href="https://www.thuiskapper.app/contact-opnemen" rel="noopener noreferrer"> <i class="fas fa-envelope-open-text"></i> Contact us</a>
      </Router>
      <div>
        <div id="price_detail">
          <img src="https://cdn.thuiskapper.app/logos/favicon-32x32.png" alt="tkt small" />
          <span>$ 0,08</span>
        </div>
        <strong>Social Platforms</strong>
          <div>
          <a target="_blank" title="ThuisKapper Discord" rel="noopener noreferrer" href="https://discord.gg/8VKeK9uvjk"><i class="fab fa-discord"></i></a>
          <a target="_blank" title="ThuisKapper Telegram" rel="noopener noreferrer" href="http://t.me/ThuisKapperApp"><i class="fab fa-telegram"></i></a>
          <a target="_blank" title="ThuisKapper Twitter" rel="noopener noreferrer" href="https://twitter.com/KapperThuis"><i class="fab fa-twitter"></i></a>
          <a target="_blank" title="ThuisKapper Facebook" rel="noopener noreferrer" href="https://www.facebook.com/ThuisKapperApp/"><i class="fab fa-facebook"></i></a>
</div><div>
          <a target="_blank" title="ThuisKapper LinkedIn" rel="noopener noreferrer" href="https://www.linkedin.com/company/thuiskapper/"><i class="fab fa-linkedin"></i></a>
          <a target="_blank" title="ThuisKapper Github" rel="noopener noreferrer" href="https://github.com/ThuisKapper"><i class="fab fa-github"></i></a>
          <a target="_blank" title="ThuisKapper Android" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=app.thuiskapper.webapp&hl=nl&gl=US"><i class="fab fa-android"></i></a>
          <a target="_blank" title="ThuisKapper iPhone (iOS)" rel="noopener noreferrer" href="https://apps.apple.com/nl/app/thuiskapper-app/id1540295759"><i class="fab fa-apple"></i></a>
      </div></div>
    </Menu>
  );
};
