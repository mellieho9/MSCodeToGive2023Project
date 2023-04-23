import { ADD_ORDER_ITEM, REMOVE_ORDER_ITEM } from './action';

const initialState = {
  orderItems: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_ITEM:
      return {
        ...state,
        orderItems: [
          ...state.orderItems,
          {
            id: action.payload.id,
            name: action.payload.name,
            quantity: action.payload.quantity
          }
        ]
      };
    case REMOVE_ORDER_ITEM:
      return {
        ...state,
        orderItems: state.orderItems.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default orderReducer;
