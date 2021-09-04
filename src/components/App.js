import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Navbar from './Navbar'
import Home from '../components/Home'
import Contact from '../components/Contact'
import Sidebar from '../Sidebar';
import Eth from 'ethjs-query';
import queryString from 'querystringify'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import '../Sidebar.css';
import './App.css';

const Web3 = require('web3');
const metaMarkAddress = "0x8a8d90d6b15cb15a5921884bec1c5bb9bfbf22f1";

class App extends Component {



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
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
  }

  constructor(props) {
    const {
      tokenName = 'ThuisKapperToken',
        tokenSymbol = 'TKT',
        tokenDecimals = 18,
        tokenAddress = metaMarkAddress,
        tokenImage = 'https://pbs.twimg.com/profile_images/802481220340908032/M_vde_oi_400x400.jpg',
        tokenNet = '1',
        message = '',
        errorMessage = '',
        net = '1',
    } = props

    super(props)

    this.state = {
      tokenName: '',
      tokenSymbol: '',
      tokenDecimals: '',
      tokenAddress: '',
      tokenImage: '',
      tokenNet: '',
      message: '',
      errorMessage: '',
      net: '',
      account: '',
      cractive: false,
      ccactive: false,
      idactive: false,
      ppactive: false,
      postCount: 0,
      posts: [],
      loading: true,
      tktWaarde: '',
      paymentOpt: '',
      message: true,
      errorMessage: '',
      web3Provider: '',
      isToggleOn: ''
    }


        this.updateNet()

  }
  _addTestAlert = () => {
    this.setState({
      content: "Purchase " + this.refs.waarde.value + " (TKT), for " + this.refs.waarde.value/12.5 + " USD.",
      tktWaarde: this.refs.waarde.value
    })

  }

  _connectWallet = () =>  {
    this.loadWeb3()
    this.loadBlockchainData()
      this.setState({
        isToggleOn: "Connected"
      })
  }
  _setPaymentCC = (childData) =>  {
      this.setState({
        paymentOpt: childData
      })
      if(childData === "creditcard") {
        const currentState = this.state.ccactive;
        this.setState({ ccactive: !currentState, idactive: false, ppactive: false, cractive: false });

    }
    if (childData === "ideal"){

      const currentState = this.state.idactive;
      this.setState({ ccactive: false, idactive: !currentState, ppactive: false, cractive: false });

    }
    if (childData === "paypal"){

      const currentState = this.state.ppactive;
      this.setState({ ccactive: false, idactive: false, ppactive: !currentState, cractive: false });

    }
    if (childData === "crypto"){

      const currentState = this.state.ccactive;
      this.setState({ ccactive: false, idactive: false, ppactive: false, cractive: !currentState });

    }
  }

    async updateNet () {
      const provider = window.web3.currentProvider
      const eth = new Eth(provider)
      const realNet = await eth.net_version()
      this.setState({ net: realNet })
    }


  render(props,context) {
    let content = null;
    let add_to_mmask = null;
    if (this.state.account !== '') {
      add_to_mmask = (
        <button className="addTkt" onClick = {async (event) => {
          const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
              web3.sendAsync({
                method: 'metamask_watchAsset',
                params: {
                  "type":"BEP20",
                  "options":{
                    "address": "0x8a8d90d6b15cb15a5921884bec1c5bb9bfbf22f1",
                    "symbol": "TKT",
                    "decimals": 18,
                    "image": "tokenImage",
                  },
                },
                id: Math.round(Math.random() * 100000),
              }, (err, added) => {
                console.log('provider returned', err, added)
                if (err || 'error' in added) {
                  this.setState({
                    errorMessage: 'There was a problem adding the token.',
                    message: '',
                  })
                  return
                }
                this.setState({
                  message: 'Token added!',
                  errorMessage: '',
                })
              })
            }}
          >Add TKT to Wallet</button>

      )
    }
    if (this.state.account !== '') {

      const search = window.location.search
      const params = queryString.parse(search)

      for (let key in params) {
        this.state[key] = params[key]
      }

      this.updateNet()
      content = (
        <div>
          <strong>Connected with adress:</strong>
          <span className="eth_adres">{this.state.account}</span>

            <form>
              <div className={this.state.cractive ? 'pm pm_active': 'pm'}  onClick={()=>{this._setPaymentCC("crypto")}}>
                <img src="https://cdn.thuiskapper.app/images/payment-bitcoin.png" />
                <div>
                  <strong>Complete your Payment with</strong>
                  <span>Cryptocurrency</span>
                </div>
              </div>
              <div className={this.state.ppactive ? 'pm pm_active': 'pm'}  onClick={()=>{this._setPaymentCC("paypal")}}>
                <img src="https://cdn.thuiskapper.app/images/payment-paypal.png" />
                <div>
                  <strong>Use online payment method</strong>
                  <span>PayPal</span>
                </div>
              </div>
              <div className={this.state.idactive ? 'pm pm_active': 'pm'} onClick={()=>{this._setPaymentCC("ideal")}}>
                <img src="https://cdn.thuiskapper.app/images/payment-ideal.png" />
                <div>
                  <strong>Dutch Payment Method</strong>
                  <span>iDeal</span>
                </div>
              </div>
              <div className={this.state.ccactive ? 'pm pm_active': 'pm'}  onClick={()=>{this._setPaymentCC("creditcard")}}>
                <img src="https://cdn.thuiskapper.app/images/payment-creditcard.png" />
                <div>
                  <strong>Purchase through Creditcard</strong>
                  <span>Credit or Debit card</span>
                </div>
              </div>
              <input type="hidden" required name="bsc_adres" value={this.state.account} />
              <input type="hidden" required name="selected_optie" value={this.state.paymentOpt} />
              <input type="number" required className="efix" placeholder="Enter the amount of TKT you want to purchase" onChange={this._addTestAlert} value={ this.state.tktWaarde } ref="waarde" name="waarde" />

              <div>
                <span  className="buy_amount">{this.state.content}</span>
              </div>
              <input type="submit" value="Purchase TKT" />
          </form>
        </div>
      )
    }
    return (
        <div id="outer-container">
          <Navbar account={this.state.account} />
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <div id="content-placeholder">
          <div className="wallet_adres">
            <button type="submit" className="wallet_connect" onClick={this._connectWallet}>
              {this.state.isToggleOn ? 'Connected ' : 'Connect to your Wallet'}
            </button>
            {add_to_mmask}
            {content}
          </div>
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
App.contextTypes = {
  web3: PropTypes.object,
}

export default App;
