export const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
export const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM';

export const addOrderItemAction = (id, name, quantity) => {
  return {
    type: ADD_ORDER_ITEM,
    payload: { id, name, quantity }
  };
};

export const removeOrderItemAction = (id) => {
  return {
    type: REMOVE_ORDER_ITEM,
    payload: { id }
  };
};
