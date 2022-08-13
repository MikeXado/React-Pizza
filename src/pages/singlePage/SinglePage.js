import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../../App.scss";
import { addToCart } from "../../redux/Shopping/shopping-actions";
import "./singlePage.scss";

function SinglePage({ currentItem, addToCart, cart }) {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let current = cart.find((item) => {
      return item.id === currentItem.id;
    });
    if (current) {
      setCartCount(current.qty);
    }
  }, [currentItem.id, cart]);

  let isZero = cartCount <= 0;

  return (
    <div className="single-page__content content-single">
      <img src={currentItem.img} alt="pizza" />
      <div className="content-single__text">
        <div className="content-single__name">{currentItem.name}</div>
        <div className="btn">
          <div className="price">{currentItem.price + "₽"}</div>
          <button
            className="pizza-cards__add-btn"
            onClick={() => {
              addToCart(currentItem.id);
            }}
          >
            <span className="plus"></span>
            <span className="text">Добавить</span>
            <span
              className="quantity-cart"
              style={{
                display: "none",
                ...(!isZero ? { display: "flex" } : {}),
              }}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
    cart: state.shop.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePage);
