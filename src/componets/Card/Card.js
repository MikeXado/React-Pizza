import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  addToCart,
  addType,
  addSize,
} from "../../redux/Shopping/shopping-actions";
import classNames from "classnames";

function Card({
  productData,
  addToCart,
  cart,
  loadCurrent,
  products,
  addType,
  addSize,
}) {
  const [cartCount, setCartCount] = useState(0);
  const typeNames = ["тонкое", "традиционное"];
  const sizes = [20, 30, 40];
  const [activeType, setActiveType] = useState(productData.type[0]);
  const [activeSize, setActiveSize] = useState(productData.size[0]);

  useEffect(() => {
    let filtred = cart.find((item) => {
      return item.id === productData.id;
    });
    if (filtred) {
      setCartCount(filtred.qty);
    }
  }, [productData.id, cart]);

  const isZero = cartCount <= 0;

  const onSelectType = (index) => {
    setActiveType(index);
  };

  const onSelectSize = (size) => {
    setActiveSize(size);
  };

  return (
    <div
      className="pizza-cards__item"
      onClick={() => {
        loadCurrent(productData);
      }}
    >
      <Link to={"/singlePage"}>
        <img src={productData.img} alt="pizza" />
        <div className="pizza-cards__text">{productData.name}</div>
      </Link>
      <div className="pizza-cards__preferences preferences-card">
        <div className="preferences-card__type">
          {typeNames.map((type, index) => (
            <button
              key={index}
              onClick={() => {
                onSelectType(index);
              }}
              className={classNames({
                active: activeType === index,
                disable: !productData.type.includes(index),
              })}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="preferences-card__size">
          {sizes.map((size, index) => (
            <button
              onClick={() => {
                onSelectSize(size);
              }}
              key={index}
              className={classNames({
                active: activeSize === size,
                disable: !productData.size.includes(size),
              })}
            >
              {size + "см"}
            </button>
          ))}
        </div>
      </div>
      <div className="pizza-cards__price">
        <div className="pizza-cards__price-amount">
          от {productData.price + " ₽"}
        </div>
        <button
          className="pizza-cards__add-btn"
          onClick={() => {
            addToCart(productData.id);
            addType(productData.id, activeType);
            addSize(productData.id, activeSize);
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
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    addType: (id, valueType) => dispatch(addType(id, valueType)),
    addSize: (id, valueSize) => dispatch(addSize(id, valueSize)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
