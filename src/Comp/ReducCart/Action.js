export const myAction = (payload) => {
  return {
    type: "ADD",
    payload,
  };
};

export const incrementQuantity = (index) => {
  return {
    type: "IncQty",
    payload: index,
  };
};

export const decrementQuantity = (index) => {
  return {
    type: "DecQty",
    payload: index,
  };
};

export const deleteAction = (payload) => {
  return {
    type: "DELETE",
    payload,
  };
};
