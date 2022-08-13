import React from "react";

function Categories({ dataCategory, setCateg, categ }) {
  return (
    <button
      value={dataCategory.value}
      className={
        "" +
        (categ === dataCategory.value
          ? "active-item"
          : "categories-filter__item")
      }
      onClick={(e) => {
        setCateg(e.target.value);
      }}
    >
      {dataCategory.text}
    </button>
  );
}

export default Categories;
