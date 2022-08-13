import "./App.scss";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "./componets/header/Header";
import { Cart } from "./componets/Cart/Cart";
import Filter from "./componets/Filter/Filter";
import Card from "./componets/Card/Card.js";
import CartPage from "./pages/CartPage";
import { connect } from "react-redux";
import Skeleton from "./componets/pizzaBlock/skeleton";
import { loadCurrent } from "./redux/Shopping/shopping-actions";
import SinglePage from "./pages/singlePage/SinglePage";

function App({ products, cart, loadCurrent, currentItem }) {
  const [filtred, setFiltred] = useState(products);
  const [categ, setCateg] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filter = products.filter((item) => {
      return item.category.includes(categ);
    });

    setIsLoading(true);
    setTimeout(() => {
      setFiltred(filter);
      setIsLoading(false);
    }, 800);
  }, [products, categ]);

  useEffect(() => {
    const search = products.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

    setIsLoading(true);
    setTimeout(() => {
      setFiltred(search);
      setIsLoading(false);
    }, 800);
  }, [products, input]);

  const sortArray = (type) => {
    const types = {
      price: "price",
      alfabet: "name",
      rating: "rating",
    };
    const sortProperty = types[type];
    const sorted = [...filtred].sort((a, b) => {
      if (sortProperty === "price") {
        return a[sortProperty] - b[sortProperty];
      } else if (sortProperty === "name") {
        return a[sortProperty].localeCompare(b[sortProperty]);
      } else if (sortProperty === "rating") {
        return a[sortProperty] - b[sortProperty];
      }
      return filtred;
    });

    setIsLoading(true);
    setTimeout(() => {
      setFiltred(sorted);
      setIsLoading(false);
    }, 800);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div className="pizza-container __container">
              <div className="pizza-header">
                <Link to={"/"}>
                  <Header />
                </Link>

                <div className="pizza-header__search">
                  <input
                    type="text"
                    placeholder="Поиск пиццы..."
                    onChange={handleInput}
                  />
                </div>
                <Link to="/cart">
                  <Cart className="disable-link" cart={cart} />
                </Link>
              </div>
              <div className="pizza-content">
                <Filter
                  setCateg={setCateg}
                  sortArray={sortArray}
                  categ={categ}
                />
                <div className="category-name">
                  <span className="category">Все</span> пиццы
                </div>
                <div className="pizza-cards">
                  {isLoading
                    ? [...new Array(6)].map((_, index) => (
                        <Skeleton key={index} />
                      ))
                    : filtred.map((prod) => {
                        return (
                          <Card
                            key={prod.id}
                            productData={prod}
                            cart={cart}
                            loadCurrent={loadCurrent}
                          />
                        );
                      })}
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div className="pizza-cart __container">
              <Link to={"/"}>
                <Header />
              </Link>

              <CartPage cart={cart} />
            </div>
          }
        />
        <Route
          path="/singlePage"
          element={
            <div className="pizza-cart __container">
              <div className="pizza-header">
                <Link to={"/"}>
                  <Header />
                </Link>
                <Link to="/cart">
                  <Cart className="disable-link" cart={cart} />
                </Link>
              </div>
              <SinglePage />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
    cart: state.shop.cart,
    currentItem: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrent: (item) => dispatch(loadCurrent(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
