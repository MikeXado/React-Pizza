import React, { useState, useEffect } from "react";
import cartImg from "../../img/cart-img.png";
import "./cart.scss";

function Cart({ cart }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    let count = 0;
    let price = 0;

    cart.forEach((element) => {
      count += element.qty;
      price += element.qty * element.price;
    });

    setCartCount(count);
    setCartPrice(price);
  }, [cart, cartCount, cartPrice, setCartCount, setCartPrice]);

  return (
    <div className="cart-content">
      <div className="cart-content__btn">
        <div className="cart-content__price-amount btn-item">
          {cartPrice + "₽"}
        </div>
        <div className="cart-content__vertical-line btn-item"></div>
        <div className="cart-content__products-amount btn-item">
          <img src={cartImg} alt="cart-img" />
          <div className="cart-content__products-count">{cartCount}</div>
        </div>
      </div>
    </div>
  );
}
export { Cart };
