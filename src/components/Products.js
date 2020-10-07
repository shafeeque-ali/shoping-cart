import React, { Component } from "react";
import formatCurrency from "../util";
import { Fade, Zoom } from "react-reveal";
import Modal from "react-modal";

export default class Products extends Component {
  constructor(props) {
    super();
    this.state = {
      product: null,
    };
  }
  openModal = (product) => {
    this.setState({ product: product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;

    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {this.props.products.map((product, index) => (
              <li key={index}>
                <div className="product">
                  <div>
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      {" "}
                      <img src={product.image} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                  </div>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)} </div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="button-primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className={"product-detail-description"}>
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes:{" "}
                    {product.availableSize.map((x) => (
                      <span>
                        {" "}
                        <button className="size-button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button-primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
