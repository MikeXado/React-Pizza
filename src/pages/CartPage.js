import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cartPage.scss";
import "../App.scss";
import cartImg from "../img/cartPage/cart-img.png";
import trashImg from "../img/cartPage/trash-icon.png";
import emptyCart from "../img/cartPage/empty-cart.png";
import { v4 as uuidv4 } from "uuid";
import Produces from "./components/Produces";
import { connect } from "react-redux";
import { removeAll } from "../redux/Shopping/shopping-actions";

function CartPage({ cart, removeAll }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;
    cart.forEach((element) => {
      items += element.qty;
      price += element.qty * element.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  return (
    <div className="cart-page__container">
      <div className="cart-content">
        <div>
          {cart.length === 0 && (
            <div className="cart-content__empty empty-cart">
              <h1 className="empty-cart__title">Корзина пустая 😕</h1>
              <p className="empty-cart__subtitle">
                Вероятней всего, вы не заказывали ещё пиццу.
                <br />
                Для того, чтобы заказать пиццу, перейди на главную страницу.
              </p>
              <img src={emptyCart} alt="empthyCart" />
              <div>
                <Link to="/">
                  <button className="empty-cart__button">
                    Вернуться назад
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div
          className={
            "" + (cart.length > 0 ? "active-cart" : "cart-content__length")
          }
        >
          <div className="cart-content__text text-content">
            <div className="text-content__title text-content__item">
              <img
                src={cartImg}
                className="text-content__cart-img"
                alt="cart"
              />
              <div className="text-content__name">Корзина</div>
            </div>
            <button
              className="text-content__clear-cart text-content__item"
              onClick={() => {
                removeAll();
              }}
            >
              <img src={trashImg} alt="clear" />
              Очистить корзину
            </button>
          </div>
          <div className="cart-content__cart-list list-cart">
            {cart.map((item) => {
              return <Produces key={item.id} cartDate={item} />;
            })}
          </div>
          <div className="cart-content__cart-list-info list-info">
            <div className="list-info__products-amount">
              Всего пицц: <span>{totalItems + " шт"}</span>
            </div>
            <div className="list-info__products-price">
              Сумма заказа: <span>{totalPrice + " ₽"}</span>
            </div>
          </div>
          <div className="cart-content__buttons buttons-cart">
            <Link to="/">
              <button className="buttons-cart__back">Вернуться назад</button>
            </Link>
            <button className="buttons-cart__pay">Оплатить сейчас</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeAll: () => dispatch(removeAll()),
  };
};
export default connect(null, mapDispatchToProps)(CartPage);
