import * as actionTypes from "./shopping-types";

export const addToCart = (itemID) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const removeAll = () => {
  return {
    type: actionTypes.REMOVE_ALL,
  };
};

export const increment = (itemID) => {
  return {
    type: actionTypes.INCREMENT,
    payload: {
      id: itemID,
    },
  };
};

export const decrement = (itemID) => {
  return {
    type: actionTypes.DECREMENT,
    payload: {
      id: itemID,
    },
  };
};

export const addType = (itemID, valueType) => {
  return {
    type: actionTypes.ADD_TYPE,
    payload: {
      id: itemID,
      valueType: valueType,
    },
  };
};
export const addSize = (itemID, valueSize) => {
  return {
    type: actionTypes.ADD_SIZE,
    payload: {
      id: itemID,
      valueSize: valueSize,
    },
  };
};
