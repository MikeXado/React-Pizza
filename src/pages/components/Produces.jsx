import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import {
  removeFromCart,
  increment,
  decrement,
} from "../../redux/Shopping/shopping-actions";

function Produces({ cartDate, removeFromCart, increment, decrement }) {
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    setCurrentPrice(cartDate.qty * cartDate.price);
  }, [cartDate]);

  return (
    <div className="list-cart__item">
      <div className="list-cart__pizza-info item">
        <img src={cartDate.img} alt="pizza" />
        <div className="list-cart__text">
          <div className="list-cart__name">{cartDate.name}</div>
          <div className="list-cart__description">
            {cartDate.type === 0 ? "тонкое тесто" : "традиционное тесто"} ,{" "}
            {cartDate.size + " см"}
          </div>
        </div>
      </div>

      <div className="list-cart__product-amount item">
        <button
          className="btn child-item"
          onClick={() => {
            decrement(cartDate.id);
          }}
        >
          -
        </button>
        <div className="list-cart__amount child-item">{cartDate.qty}</div>
        <button
          className="btn child-item"
          onClick={() => {
            increment(cartDate.id);
          }}
        >
          +
        </button>
      </div>
      <div className="list-cart__price item">{currentPrice + " ₽"}</div>
      <button
        className="btn-remove item"
        onClick={() => {
          removeFromCart(cartDate.id);
        }}
      >
        <span></span>
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    decrement: (id) => dispatch(decrement(id)),
    increment: (id) => dispatch(increment(id)),
  };
};

export default connect(null, mapDispatchToProps)(Produces);
