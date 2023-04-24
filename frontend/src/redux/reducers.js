
import { ADD_ORDER_ITEM, REMOVE_ORDER_ITEM, UPDATE_ORDER_ITEM } from './action';
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
    case UPDATE_ORDER_ITEM:
      return {
        ...state,
        orderItems: state.orderItems.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity
            }
          }
          return item;
        })
      };
    default:
      return state;
  }
};

export default orderReducer;
