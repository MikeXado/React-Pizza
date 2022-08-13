import * as actionTypes from "./shopping-types";
import crevetki from "../pizza/crevetki-pizza.png";
import ceplionok from "../pizza/sirnii-ceplenok.png";
import cheesburger from "../pizza/cheesburger-pizza.png";
import cheesePizza from "../pizza/cheese-pizza.png";

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      category: "closed",
      name: "Сырная",
      price: 450,
      rating: 8,
      img: cheesePizza,
      type: [0, 1],
      size: [20, 30, 40],
    },

    {
      id: 3,
      category: "closed",
      name: "Сырная",
      price: 100,
      rating: 8,
      img: cheesePizza,
      type: [1],
      size: [20, 30],
    },

    {
      id: 4,
      category: "meal , grill",
      name: "Сырный цыпленок",
      price: 385,
      rating: 9,
      img: ceplionok,
      type: [1],
      size: [20, 30],
    },

    {
      id: 5,
      category: "meal , grill , chili",
      name: "Креветки по-азиатски",
      price: 290,
      rating: 7,
      img: crevetki,
      type: [0],
      size: [20, 30, 40],
    },

    {
      id: 6,
      category: "vegetarian",
      name: "Чизбургер-пицца",
      price: 395,
      rating: 10,
      img: cheesburger,
      type: [0, 1],
      size: [20, 30, 40],
    },

    {
      id: 7,
      category: "vegetarian",
      name: "Чизбургер-пицца",
      price: 395,
      rating: 10,
      img: cheesburger,
      type: [0, 1],
      size: [20, 30, 40],
    },
  ],
  categories: [
    {
      value: "",
      text: "Все",
    },

    {
      value: "meal",
      text: "Мясные",
    },

    {
      value: "vegetarian",
      text: "Вегетарианская",
    },

    {
      value: "grill",
      text: "Гриль",
    },

    {
      value: "chili",
      text: "Острые",
    },

    {
      value: "closed",
      text: "Закрытые",
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = state.products.find((prod) => prod.id === action.payload.id);
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? {
                    ...item,
                    qty: item.qty + 1,
                  }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.REMOVE_ALL:
      return {
        ...state,
        cart: (state.cart = []),
      };
    case actionTypes.INCREMENT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };

    case actionTypes.ADD_TYPE:
      const findType = state.products.find((item) =>
        item.type.includes(action.payload.valueType)
      );

      let valType = action.payload.valueType;
      return {
        ...state,
        cart: findType
          ? state.cart.map((cart) =>
              cart.id === action.payload.id
                ? {
                    ...cart,
                    type: (cart.type = valType),
                  }
                : cart
            )
          : [...state.cart, { ...findType, type: 0 }],
      };
    case actionTypes.ADD_SIZE:
      const findSize = state.products.find((item) =>
        item.size.includes(action.payload.valueSize)
      );

      let valSize = action.payload.valueSize;
      return {
        ...state,
        cart: findSize
          ? state.cart.map((cart) =>
              cart.id === action.payload.id
                ? {
                    ...cart,
                    size: (cart.size = valSize),
                  }
                : cart
            )
          : [...state.cart, { ...findSize, size: 20 }],
      };
    default:
      return state;
  }
};

export default shopReducer;
