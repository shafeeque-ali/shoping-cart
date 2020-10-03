//feature-1
import React, { Component } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">cart items</div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}
export default App;
