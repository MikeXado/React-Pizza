import React from "react";
import Logo from "../../img/logo.png";
import "./header.scss";
import "../../App.scss";

function Header() {
  return (
    <div className="header-content">
      <img src={Logo} alt="logo" />
      <div className="header-content__logo-text">
        <h1 className="header-content__title">PIZZA</h1>
        <p className="header-content__subtitle">
          самая вкусная пицца во вселенной
        </p>
      </div>
    </div>
  );
}

export { Header };
