//feature-1
import React, { Component } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Carting from "./components/Carting";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: JSON.parse(localStorage.getItem("cartItems"))
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };
  sortProducts = (e) => {
    //impli

    const sort = e.target.value;
    console.log(sort);
    this.setState((state) => ({
      sort: sort,
      product: this.state.products.sort((a, b) =>
        sort === "lowest"
          ? a.price > b.price
          : sort === "highest"
          ? a.price < b.price
          : a.id < b.id
      ),
    }));
  };
  filterProducts = (e) => {
    //impli
    if (e.target.value === "") {
      this.setState({
        ...this.state,
        products: data.products,
        size: e.target.value,
      });
    } else {
      this.setState({
        ...this.state,
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSize.indexOf(e.target.value) >= 0
        ),
      });
    }
  };
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let allreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        allreadyInCart = true;
      }
    });
    if (!allreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ ...this.state, cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  removeFromCart = (item) => {
    const cartItems = this.state.cartItems.slice();
    const filterCartItem = cartItems.filter((x) => x._id !== item._id);
    this.setState({
      ...this.state,
      cartItems: filterCartItem,
    });
    localStorage.setItem("cartItems", JSON.stringify(filterCartItem));
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Mega Shoping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            {this.state.cartItems.length !== 0 && (
              <div className="sidebar">
                {" "}
                <Carting
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />{" "}
              </div>
            )}
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}
export default App;
