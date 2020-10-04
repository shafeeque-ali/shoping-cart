import React, { Component } from "react";
import formatCurrency from "../util";

export default class Carting extends Component {
  constructor() {
    super();
    this.state = { showCheckout: false };
  }
  handleInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header"> Cart is empty </div>
        ) : (
          <div className="cart cart-header">
            {" "}
            You have {cartItems.length} items in the cart{" "}
          </div>
        )}
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="cart-image">
                  <img src={item.image} alt={item.title}></img>
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button onClick={() => this.props.removeFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart ">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button onClick={() => this.setState({ showCheckout: true })}>
                Proceed
              </button>
            </div>
          </div>
        )}
        <div>
          {this.state.showCheckout && (
            <div>
              <form onSubmit={this.createOrder}>
                <ul className="form-container">
                  <li>
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      onChange={this.handleInput}
                    ></input>
                  </li>
                  <li>
                    <label>Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      onChange={this.handleInput}
                    ></input>
                  </li>
                  <li>
                    <label>Address</label>
                    <input
                      name="address"
                      type="text"
                      required
                      onChange={this.handleInput}
                    ></input>
                  </li>
                  <li>
                    <button className="button-primary" type="submit">
                      Checkout
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
