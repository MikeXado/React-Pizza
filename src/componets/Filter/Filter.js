import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./filter.scss";
import arrow from "../../img/arrow-sort.png";
import Categories from "./Categories";

import { connect } from "react-redux";

function Filter({ categories, setCateg, sortArray, categ }) {
  return (
    <div className="pizza-content__filter filter-content">
      <div className="filter-content__categories categories-filter">
        {categories.map((category) => {
          return (
            <Categories
              key={uuidv4()}
              dataCategory={category}
              setCateg={setCateg}
              categ={categ}
            />
          );
        })}
      </div>
      <div className="filter-content__sort sort-filter">
        <div className="sort-filter__arrow-btn">
          <img className="arrow" src={arrow} alt="arrow-sort" />
          <div className="sort-filter__text">
            Сортировка по:{" "}
            <div className="sort-filter__button">
              <select
                onChange={(e) => {
                  sortArray(e.target.value);
                }}
              >
                <option value="none" hidden>
                  Выберите
                </option>
                <option value="rating">по популярности</option>;
                <option value="price">по цене</option>;
                <option value="alfabet">по алфавиту</option>;
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filtered: state.shop.filtered,
    categories: state.shop.categories,
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(Filter);
