import React, { Component } from 'react';
import Web3 from 'web3';
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar'
import Home from '../components/Home'
import Contact from '../components/Contact'
import Sidebar from '../Sidebar';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import '../Sidebar.css';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } 
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    if(networkData) {
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      this.setState({ socialNetwork })
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null
    }
  }

  render() {
    return (

        <div id="outer-container">
          <Navbar account={this.state.account} />
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <div id="content-placeholder">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </Router>
          </div>
      </div>
    );
  }
}

export default App;
