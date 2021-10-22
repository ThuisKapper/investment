import React, { Component } from 'react'
import axios from 'axios'

class PurchaseTKTForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bsc_adres: this.props.dataFromParent,
      content: '',
      payment_opt: '',
      paymentOpt: '',
      amount_tkt: '',
      tktWaarde: '',
      ccactive: false,
      idactive: false,
      ppactive: false,
      cractive: false,
    }
  }
  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    axios.post('https://www.thuiskapper.app/payment/test', this.state)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
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

  _addTestAlert = () => {
    this.setState({
      content: "Purchase " + this.refs.waarde.value + " (TKT), for " + this.refs.waarde.value/12.5 + " USD.",
      tktWaarde: this.refs.waarde.value
    })

  }


  render() {
    const { payment_opt, amount_tkt, cractive, paymentOpt } = this.state
    return(
<div>
  <div className={cractive ? 'pm pm_active w-full lg:w-5/12': 'pm w-full lg:w-5/12'}  onClick={()=>{this._setPaymentCC("crypto")}}>
    <img src="https://cdn.thuiskapper.app/images/payment-bitcoin.png" alt="Buy with crypto"  />
    <div>
      <strong>Complete your Payment with</strong>
      <span>Cryptocurrency</span>
    </div>
  </div>
  <div className={this.state.ppactive ? 'pm pm_active w-full lg:w-5/12': 'pm w-full lg:w-5/12'}  onClick={()=>{this._setPaymentCC("paypal")}}>
    <img src="https://cdn.thuiskapper.app/images/payment-paypal.png" alt="Buy with paypal"  />
    <div>
      <strong>Use online payment method</strong>
      <span>PayPal</span>
    </div>
  </div>
  <div className={this.state.idactive ? 'pm pm_active w-full lg:w-5/12': 'pm w-full lg:w-5/12'} onClick={()=>{this._setPaymentCC("ideal")}}>
    <img src="https://cdn.thuiskapper.app/images/payment-ideal.png" alt="Buy with iDeal"  />
    <div>
      <strong>Dutch Payment Method</strong>
      <span>iDeal</span>
    </div>
  </div>
  <div className={this.state.ccactive ? 'pm pm_active w-full lg:w-5/12': 'pm w-full lg:w-5/12'}  onClick={()=>{this._setPaymentCC("creditcard")}}>
    <img src="https://cdn.thuiskapper.app/images/payment-creditcard.png" alt="Buy with Creditcard" />
    <div>
      <strong>Purchase through Creditcard</strong>
      <span>Credit or Debit card</span>
    </div>
  </div>

        <form onSubmit={this.submitHandler}>
          <input type="hidden" onChange={this.changeHandler} required name="bsc_adres" value={this.props.dataFromParent} />
          <input type="hidden" onChange={this.changeHandler} required name="payment_opt" value={paymentOpt} />
          <input type="hidden" onChange={this.changeHandler} required name="tkt_aantal" value={this.state.tktWaarde} />
          <input type="number" required name="amount_tkt" onKeyUp={this._addTestAlert} ref="waarde" className="efix" placeholder="Enter the amount of TKT you want to purchase" />
          <div>
            <span className="buy_amount">{this.state.content}</span>
          </div>
          <input type="submit" value="Purchase TKT" />
      </form>
      </div>
    )
  }

}

export default PurchaseTKTForm
